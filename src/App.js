import './App.css';
import './components/styles/stackCards.css';
import './components/styles/pricing.css';
import bgImage from './components/images/circle-scatter-haikei.svg';
import fgImage from './components/images/layered-waves-haikei.svg';
import bgImageMobile from './components/images/circle-scatter-haikei-mobile.svg';
import fgImageMobile from './components/images/layered-waves-haikei-mobile.svg';
import React, {useMemo, useEffect, useRef, useCallback, useState} from 'react';


function App() {
  const wrapperRef = useRef(null);
  const stackAreaRef = useRef(null);
  const cardRefs = useRef([]);

  cardRefs.current = [];

  const cardsData = useMemo(() =>[
    {
    sub: 'Simplified',
    content: 'Complex tasks are now simple',
    bg: '#E0F2FE',
  },
  {
    sub: 'Boost Productivity',
    content: 'Perform Tasks in less time',
    bg: '	#D1FAE5',
  },
  {
    sub: 'Facilitated learning',
    content: 'Train anyone from anywhere',
    bg: '#EDE9FE',
  },
  {
    sub: 'Support',
    content: 'Now it\'s 24/7 support',
    bg: '#FEF3C7',
  },
  ], []);



  const addToRefs = (el) => {
    if(el && !cardRefs.current.includes(el)){
      cardRefs.current.push(el);
    }
  };

  const rotateCards = useCallback(() => {
    // console.log("cards found:", cardRefs.current.length);
    let angle = 0;
    cardRefs.current.forEach((card, index) => {
      if (card.classList.contains("away")) {
        card.style.transform = `translateY(-120vh) rotate(-48deg)`;
      } else {
        card.style.transform = `rotate(${angle}deg)`;
        angle -= 10;
        card.style.zIndex = cardsData.length - index;
      }
    });
  }, [cardsData]);

  useEffect (() => {
    const handleScroll = () =>{
      var distance = window.innerHeight/2;
      const topVal =  stackAreaRef.current.getBoundingClientRect().top;
      let index = -1 * (topVal/distance + 1);
      index = Math.floor(index);

      // console.log("Index:", index);
      // console.log("Card 0 has 'away':", cardRefs.current[0]?.classList.contains('away'));
      // console.log("scroll triggered ✅");

      for( let i = 0; i<cardRefs.current.length; i++){
        if(i<=index){
          cardRefs.current[i].classList.add("away");
        }else{
          cardRefs.current[i].classList.remove("away");
        }
      }
      // console.log(
      //   cardRefs.current.map((card, i) => ({
      //     i,
      //     hasAway: card.classList.contains('away'),
      //   }))
      // );
      rotateCards();
    };

    rotateCards();
    const wrapper = wrapperRef.current;

    wrapper.addEventListener("scroll", handleScroll);

    return () => {
      wrapper.removeEventListener('scroll', handleScroll);
    };

  }, [rotateCards]);

  const [size, setSize] = useState([window.innerWidth, window.innerHeight]);

  useEffect(() => {
    const handleResize = () => setSize([window.innerWidth, window.innerHeight]);
    window.addEventListener('resize', handleResize);
    console.log(size[0]);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // const[angles, setAngle] = useState(() => colors.map((_, index) => index * -10));
  // const degrees=colors.map((_, index) => index * -10 );

  return (
    <div className="App">
      <div className="wrapper" ref = {wrapperRef}>

        <header>
          <img src={(size[0] > 1024) ? bgImage : bgImageMobile} alt="bgImage" className="bgImage"/>
          <img src={(size[0] > 1024) ? fgImage : fgImageMobile} alt="fgImage" className="fgImage"/>
          <div className='text'>
            <h1 className="title">Welcome</h1>
            <h3 className = "sub-title smaller">This is animated Landing Page</h3>
          </div>
        </header>

        <div className="stack-area" ref={stackAreaRef}>
          <div className="left">
            <div className = "stackTitle text">Our features</div>
            <div className = "info text">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente qui
          quis, facere, cupiditate, doloremque natus ex perspiciatis ratione hic
          corrupti adipisci ea doloribus!</div>
          </div>

          <div className="right">
              {cardsData.map((card, index) =>(
                <div 
                key={index} 
                ref = {addToRefs}
                className={`card card-after-${index}`} 
                style={{background: card.bg}}
                >
                    <div className = "sub">{card.sub}</div>
                    <div className = "content">{card.content}</div>
                </div>
              ))}
          </div>
        </div>
        
        <div className="pricing">
          <p className = "sub-title">Price</p>
              <div className="priceCard standard">
                <div className = "price-name">Standard</div>
                <div className = "price">5000₸</div>
                  <ul className = "price-info">
                    <li>Landing Page</li>
                    <li>Building Design</li>
                    <li>Responsive website</li>
                    <li>Other features are discussed directly</li>
                  </ul>
                  <a className = "example-link" href="https://app.haikei.app/">Other examples</a>
                  <a className = "contact-button" href = "t.me/Uzi1q">Contact me</a>
              </div>
              <div className="priceCard premium">
                <div className = "price-name">Premium</div>
                <div className = "price">8000₸</div>
                  <ul className = "price-info">
                    <li>Animations😎</li>
                    <li>Landing Page</li>
                    <li>Building Design</li>
                    <li>Responsive website</li>
                    <li>Other features are discussed directly</li>
                  </ul>
                  <a className = "example-link" href="#contact">Other examples</a>
                  <a className = "contact-button" href = "#contact">Contact me</a>
              </div>
        </div>

        <div className = "footer" id = "contact">
          <div className = "footer-title footer-section">
            <p>Contact Us</p>
            <p>Email: support@example.com</p>
            <p>Phone: +1 234 567 890</p>
          </div>
          <div className = "links footer-section">
            <a className = "contact-link" href = "#contact">TeleGram</a>
            <a className = "contact-link" href = "#contact">TeleGram</a>
            <a className = "contact-link" href = "#contact" >TeleGram</a>
            <a className = "contact-link" href = "#contact">TeleGram</a>
            <a className = "contact-link" href = "#contact">TeleGram</a>
          </div>
          <div className='footer-section privacy'>
            <p>© 2025 YourCompany. All rights reserved.</p>
            <p>Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
