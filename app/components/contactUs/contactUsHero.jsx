'use client'
import Image from "next/image";
import "../../styles/contactus-hero.css";
import TextAnimation from "../layout/TextAnimation";

const ContactUsHero = () => {
  return (
    <section className="cu-section">

      {/* ── Top: heading + description ── */}
      <div className="cu-top">

                            <TextAnimation animateOnScroll={true} delay={0.3}>
        
        <h1 className="cu-heading">Contact us</h1>
                            </TextAnimation>

                            <TextAnimation animateOnScroll={true} delay={0.3}>


        <p className="cu-desc">
          If Your Business Is Facing Challenges With HR, Employee Development,
          Or Organizational Efficiency, Or If You&apos;re Seeking Expert Guidance On
          People Strategies, We&apos;re Here To Help. Drop Your Details Below, And
          One Of Our Experts Will Reach Out.
        </p>
                            </TextAnimation>
      </div>

      {/* ── Middle: form + image ── */}
      <div className="cu-main">

        <div className="form-wrapper">
          <form className="cu-form" onSubmit={(e) => e.preventDefault()}>
            <div className="cu-row">
              <div className="cu-field">
                <label className="cu-label">Name Of Company *</label>
                <input className="cu-input" type="text" placeholder="Enter Your Company Name" />
              </div>
              <div className="cu-field">
                <label className="cu-label">Field Of Activity *</label>
                <input className="cu-input" type="text" placeholder="Enter The Field Of Activity" />
              </div>
            </div>

            <div className="cu-row">
              <div className="cu-field">
                <label className="cu-label">Phone *</label>
                <input className="cu-input" type="tel" placeholder="Enter Your Phone Number" />
              </div>
              <div className="cu-field">
                <label className="cu-label">Email *</label>
                <input className="cu-input" type="email" placeholder="Enter Your Email Address" />
              </div>
            </div>

            <div className="cu-field cu-field--full">
              <label className="cu-label">Name</label>
              <textarea className="cu-textarea" placeholder="Your Name" rows={5} />
            </div>

            <button type="submit" className="cu-btn btn-4">Send now</button>
          </form>
        </div>

        <div className="cu-image">
          <Image
            src="/img14.jpg"
            alt="Amsha Advisory office"
            fill
            className="cu-img"
          />
        </div>
      </div>

      {/* ── Bottom: contact info ── */}
      <div className="cu-contacts">

        <div className="cu-contact-item">
          <div className="cu-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="31" height="31" viewBox="0 0 31 31" fill="none">
              <path d="M6.09667 3.44444C6.2 4.97722 6.45833 6.47556 6.87167 7.905L4.805 9.97167C4.09889 7.905 3.65111 5.71778 3.49611 3.44444H6.09667ZM23.0778 24.1456C24.5417 24.5589 26.04 24.8172 27.5556 24.9206V27.4867C25.2822 27.3317 23.095 26.8839 21.0111 26.195L23.0778 24.1456ZM7.75 0H1.72222C0.775 0 0 0.775 0 1.72222C0 17.8939 13.1061 31 29.2778 31C30.225 31 31 30.225 31 29.2778V23.2672C31 22.32 30.225 21.545 29.2778 21.545C27.1422 21.545 25.0583 21.2006 23.1294 20.5633C22.9589 20.4996 22.7775 20.4704 22.5956 20.4772C22.1478 20.4772 21.7172 20.6494 21.3728 20.9767L17.5839 24.7656C12.7022 22.2689 8.73109 18.2978 6.23444 13.4161L10.0233 9.62722C10.5056 9.145 10.6433 8.47333 10.4539 7.87056C9.80172 5.88637 9.47033 3.81084 9.47222 1.72222C9.47222 0.775 8.69722 0 7.75 0Z" fill="white" />
            </svg>
          </div>

                            <TextAnimation animateOnScroll={true} delay={0.3}>


          <p>+971 50 756 9611</p>
                            </TextAnimation>
  
                            <TextAnimation animateOnScroll={true} delay={0.3}>

          <p>+255 757 7911 11</p>
                            </TextAnimation>
        </div>

        <div className="cu-contact-item">
          <div className="cu-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="28" viewBox="0 0 32 28" fill="none">
              <path d="M31.6784 6.47889L27.8784 3.63222C27.6202 3.47111 27.3394 3.34695 27.0448 3.26356C26.7515 3.17049 26.446 3.11915 26.1376 3.11111H15.2L16.4816 10.8889H26.1376C26.4 10.8889 26.728 10.8313 27.0432 10.7364C27.3584 10.6416 27.6624 10.5109 27.8768 10.3693L31.6768 7.51956C31.8928 7.378 32 7.18978 32 7C32 6.81022 31.8928 6.622 31.6784 6.47889ZM13.6 0H12C11.7878 0 11.5843 0.0819442 11.4343 0.227806C11.2843 0.373667 11.2 0.571498 11.2 0.777778V6.22222H5.8624C5.5968 6.22222 5.2704 6.27978 4.9552 6.37622C4.6384 6.46956 4.336 6.59867 4.1216 6.74333L0.3216 9.59C0.1056 9.73156 0 9.92133 0 10.1111C0 10.2993 0.1056 10.4876 0.3216 10.6322L4.1216 13.482C4.336 13.6236 4.6384 13.7542 4.9552 13.8476C5.2704 13.9424 5.5968 14 5.8624 14H11.2V27.2222C11.2 27.4285 11.2843 27.6263 11.4343 27.7722C11.5843 27.9181 11.7878 28 12 28H13.6C13.8122 28 14.0157 27.9181 14.1657 27.7722C14.3157 27.6263 14.4 27.4285 14.4 27.2222V0.777778C14.4 0.571498 14.3157 0.373667 14.1657 0.227806C14.0157 0.0819442 13.8122 0 13.6 0Z" fill="white" />
            </svg>
          </div>
                            <TextAnimation animateOnScroll={true} delay={0.3}>


          <p>2nd floor | Office no 15 | Viva Towers | Ali Hassan Mwinyi Rd | Dar es Salaam | Tanzania.</p>
                            </TextAnimation>
                            <TextAnimation animateOnScroll={true} delay={0.3}>

          <p>Office 1019 | Park Lane Tower | Business Bay | Dubai | UAE.</p>
                            </TextAnimation>
        </div>

        <div className="cu-contact-item">
          <div className="cu-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="24" viewBox="0 0 30 24" fill="none">
              <path d="M30 3C30 1.35 28.65 0 27 0H3C1.35 0 0 1.35 0 3V21C0 22.65 1.35 24 3 24H27C28.65 24 30 22.65 30 21V3ZM27 3L15 10.5L3 3H27ZM27 21H3V6L15 13.5L27 6V21Z" fill="white" />
            </svg>
          </div>

                            <TextAnimation animateOnScroll={true} delay={0.3}>
                              
          <p>info@amshaadvisory.com</p>
                              </TextAnimation>
        </div>

      </div>
    </section>
  );            
};

export default ContactUsHero;
