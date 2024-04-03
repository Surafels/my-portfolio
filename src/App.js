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
      const languages = ['javascript', 'ruby', 'typescript', 'html', 'css', 'PostgresSQL'];
      const frameworks = ['react', 'redux', 'angular', 'vue', 'ruby on rails', 'devise', 'express'];

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
    const imageRegex = /<img[^>]+src="([^">]+)"/g;
    const match = imageRegex.exec(readmeContent);
    if (match && match[1]) {
      return match[1];
    }
    return '';
  };

  // const extractLiveDemoLink = (readmeContent) => {
  //   const liveDemoRegex = /Live Demo: \[([^\]]+)\]\(([^\)]+)\)/g;
  //   const liveDemoMatch = liveDemoRegex.exec(readmeContent);
  //   const liveDemoLink = liveDemoMatch ? liveDemoMatch[2] : '';
  //   return liveDemoLink;
  // };
  useEffect(() => {
    const fetchCardData = async () => {
      try {
        const response = await fetch('https://api.github.com/users/Surafels/repos', {
          headers: {
            Authorization: 'Bearer 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',
          },
        });

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
                    image: '',
                    // liveDemoLink: '',
                  };
                }
                throw new Error(`Failed to fetch README for repository: ${repo.name}`);
              }

              const readmeData = await readmeResponse.json();
              const { languages, frameworks } = await fetchLanguagesAndFrameworksFromDescription(
                repo,
              );
              const image = extractImageFromReadme(atob(readmeData.content));
              // const liveDemoLink = extractLiveDemoLink(atob)(readmeData.content);
              return {
                ...repo,
                languages,
                frameworks,
                image,
                // liveDemoLink,

              };
            } catch (error) {
              console.error(`Error fetching README for repository: ${repo.name}`, error);
              return {
                ...repo,
                languages: ['Error fetching languages'],
                frameworks: ['Error fetching frameworks'],
                image: '',
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
    <div>
      <div className="container-fluid p-0 ">
        <section id="home">

          <Home />
        </section>
        <section className="p-2" id="portfolio">
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3">
            {cardsData.map((card) => (
              <Cards
                key={card.id}
                title={card.name}
                languages={card.languages.map((lang) => capitalize(lang))}
                frameworks={card.frameworks.map((framework) => capitalize(framework))}
                description={card.description || 'No description available'}
                image={card.image}
                style={{ width: '300px', height: '300px' }}
                link={card.html_url}
                // liveDemoLink= {card.liveDemoLink}
              />
            ))}
          </div>
        </section>
        <section className="p-2" id="about">
          <About />
        </section>
        <section className="p-2" id="contact">
          <Contact />
        </section>
      </div>
    </div>
  );
}

export default App;
