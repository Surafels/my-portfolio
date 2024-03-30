import 'bootstrap/dist/css/bootstrap.min.css';
import './about.css';
import frontIcon from '../../assets/icons/front-icon.png';
import backIcon from '../../assets/icons/backend.png';
import skills from '../../assets/icons/skills.png';

const About = () => (
  <>
    <div className="m-3 text-center">
      <h2 className="about-heading text-center">About Me</h2>

      <p
        className="d-flex w-100 text-center my-3 "
        id="abt-det"
        style={{
          lineHeight: '32px', fontFamily: 'Inter, sans-serif', fontStyle: 'normal', fontWeight: '400', fontSize: '20px', color: '#42526e',
        }}
      >
        {' '}
        I can help you build a product , feature or website Look through some
        of my work and experience! If you like what you see and have a project
        you need coded, don't hesitate to contact me.
      </p>
      <a href="https://drive.google.com/file/d/1xYRj6GnTZCVx3UmS8SyuAqM4DOjPQqub/view?usp=sharing" id="btn" target="_blank" rel="noreferrer">Get my resume</a>

    </div>
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 justify-content-center text-center" id="abt-cards">

      <div className="card bg-custom-color custom-row">
        <img className="mb-4" src={frontIcon} alt="front icon" />
        <h3 className="text-center font-weight-bold fs-4 mb-4 text-dark">Front-End</h3>

        <ul className="d-flex flex-wrap list-unstyled text-center justify-content-center" id="lan-list">
          <li id="language">React</li>
          <li id="language">Redux</li>
          <li id="language">JavaScript</li>
          <li id="language">HTML</li>
          <li id="language">CSS</li>
          <li id="language">Figma</li>

        </ul>
      </div>
      <div className="card bg-custom-color custom-row ml-3  mr-3">
        <img className="mb-4" src={backIcon} alt="back icon" />
        <h3 className="text-center font-weight-bold fs-4 mb-4 text-dark">Back-End and Testing</h3>
        <ul className="d-flex flex-wrap list-unstyled text-center justify-content-center" id="lan-list">
          <li id="language">Ruby on Rails</li>
          <li id="language">PostgresSQL</li>
          <li id="language">Ruby</li>
          <li id="language">RSpec</li>
          <li id="language">Jest</li>
          <li id="language">Capybara</li>

        </ul>
      </div>
      <div className="card bg-custom-color custom-row">
        <img className="mb-4" src={skills} alt="skills" />
        <h3 className="text-center font-weight-bold fs-4 mb-4 text-dark">Other Professional Skills</h3>
        <ul className="d-flex flex-wrap list-unstyled text-center justify-content-center" id="lan-list">
          <li id="language">Git, Github</li>
          <li id="language">Remote Pair-Programming</li>
          <li id="language">Heroku, Netlifly</li>
          <li id="language">Monitering, Teamwork</li>
          <li id="language">Dev Tools</li>
          <li id="language">Data base managemnt</li>

        </ul>
      </div>

    </div>
  </>
);

export default About;
