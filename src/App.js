import React, { useEffect, useState } from 'react';
import Home from './components/home/home';
import Cards from './components/cards/cards';
import About from './components/about/about';
import Contact from './components/contact/contact';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [cardsData, setCardsData] = useState([]);
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const fetchLanguagesAndFrameworksFromDescription = async (repo) => {
    try {
      const response = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}`, {
        headers: {
          Authorization: 'Bearer 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',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch repository data');
      }

      const data = await response.json();
      const description = data.description !== null ? data.description.toLowerCase() : '';
      const languages = ['javascript', 'ruby', 'typescript', 'html', 'css'];
      const frameworks = ['react', 'redux', 'angular', 'vue', 'ruby on rails', 'express'];

      const foundLanguages = languages.filter((lang) => description.includes(lang));
      const foundFrameworks = frameworks.filter((framework) => (
        (framework === 'ruby on rails' && (description.includes('ruby on rails') || description.includes('rails')))
          || (framework === 'react' && description.includes('react'))
          || (framework === 'redux' && description.includes('redux'))
          || (framework !== 'ruby on rails' && framework !== 'react' && framework !== 'redux' && description.includes(framework))
      ));

      return {
        languages: foundLanguages.length > 0 ? foundLanguages : ['No languages mentioned'],
        frameworks: foundFrameworks.length > 0 ? foundFrameworks : ['No frameworks mentioned'],
      };
    } catch (error) {
      console.error('Error fetching repository data:', error);
      return {
        languages: ['No languages mentioned'],
        frameworks: ['No frameworks mentioned'],
      };
    }
  };
  const extractImageFromReadme = (readmeContent) => {
    // Regular expression pattern to match Markdown image syntax
    const imageRegex = /!\[.*?\]\((.*?)\)/g;
    // const imagePath = `/assets/car_image_${repo.id}.jpg`; // Use the relative path to the image file

    // Find all matches of the image pattern in the README content
    const matches = [...readmeContent.matchAll(imageRegex)];

    // If there are matches, return the URL of the first image found
    if (matches.length > 0) {
      // Extract the image URL from the first match
      const imageUrl = matches[0][1];
      return imageUrl;
    }

    // If no image URL found, return null
    return null;
  };

  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Surafels/repos');

        if (!response.ok) {
          throw new Error('Failed to fetch repository data');
        }

        const data = await response.json();

        const repositoriesWithReadmeInfo = await Promise.all(
          data.map(async (repo) => {
            try {
              const readmeResponse = await fetch(`https://api.github.com/repos/${repo.owner.login}/${repo.name}/readme`);

              if (!readmeResponse.ok) {
                if (readmeResponse.status === 404) {
                  console.warn(`README not found for repository: ${repo.name}`);
                  return {
                    ...repo,
                    languages: ['No languages mentioned'],
                    frameworks: ['No frameworks mentioned'],
                  };
                }
                throw new Error(`Failed to fetch README for repository: ${repo.name}`);
              }

              const readmeData = await readmeResponse.json();

              const { languages, frameworks } = await fetchLanguagesAndFrameworksFromDescription(repo);

              const image = extractImageFromReadme(readmeData.content);

              return {
                ...repo,
                languages,
                frameworks,
                image,
              };
            } catch (error) {
              console.error(`Error fetching README for repository: ${repo.name}`, error);
              return {
                ...repo,
                languages: ['Error fetching languages'],
                frameworks: ['Error fetching frameworks'],
              };
            }
          }),
        );

        const filteredRepos = repositoriesWithReadmeInfo.filter((repo) => !repo.fork
          && (repo.stargazers_count > 0 || repo.homepage));

        setCardsData(filteredRepos);
      } catch (error) {
        console.error('Error fetching card data:', error);
      }
    };

    fetchCardData();
  }, []);

  return (
    <div className="App">
      <Home />
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
        {cardsData.length > 0
  && cardsData.map((card) => {
    console.log('Image URL:', card.image);
    const image = card.image || 'assets/images/bg.png';
    return (
      <Cards
        key={card.id}
        title={card.name}
        languages={card.languages.map((lang) => capitalize(lang))}
        frameworks={card.frameworks.map((framework) => capitalize(framework))}
        description={card.description || 'No description available'}
        // image={card.image || 'No image available'}
        image={image}
        style={{ width: '300px', height: '300px' }}
        link={card.html_url}
      />
    );
  })}

      </div>
      <About />
      <Contact />
    </div>
  );
}

export default App;
