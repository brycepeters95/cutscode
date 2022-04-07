import React from 'react'
import { connect } from 'react-redux';
import { Navigate} from 'react-router-dom';
const Landing = ({isAuthenticated,typeofuser})=> {
    if (isAuthenticated) {
        if (typeofuser === 'user'){
        return <Navigate to='/userdashboard' />;
        }
        if(typeofuser === 'barber'){
        return <Navigate to='/barberdashboard' />;
        }
      }
  return (
    <div>
                        <header className="bg-dark py-4">
                            <div className="container px-5">
                                <div className="row gx-5 justify-content-center">
                                    <div className="col-lg-6">
                                        <div className="text-center my-5">
                                            <h1 className="display-5 fw-bolder text-white mb-2">Get a haircut on the Go!</h1>
                                            {/* <p className="lead text-white-50 mb-4">Get A haircut on the Go!</p> */}
                                            <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                                                <a className="btn btn-primary btn-lg px-4 me-sm-3" href="/login">Log In</a>
                                                <a className="btn btn-outline-light btn-lg px-4" Link href='/register'>Sign Up</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                        <section className="py-5 border-bottom" id="features">
                            <div className="container px-5 my-5">
                                <div className="row gx-5">
                                    <div className="col-lg-4 mb-5 mb-lg-0">
                                        <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3 text-center"><i className="bi bi-collection"></i></div>
                                        <h2 className="h4 fw-bolder">Choose A Barber</h2>
                                        <p>Choose between multiple barbers around your locations based on Reviews</p>
    
                                    </div>
                                    <div className="col-lg-4 mb-5 mb-lg-0">
                                        <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3 text-center"><i className="bi bi-building"></i></div>
                                        <h2 className="h4 fw-bolder">They Come To You</h2>
                                        <p>We value your time So the barber comes to you where ever you are. No more waiting around to get a haircut. </p>
    
                                    </div>
                                    <div className="col-lg-4">
                                        <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3 text-center"><i className="bi bi-toggles2"></i></div>
                                        <h2 className="h4 fw-bolder">Just Bring the Chair</h2>
                                        <p>all the barber needs from you is a chair and a broom</p>
    
    
                                    </div>
                                </div>
                            </div>
                        </section>
    
                        <section className="py-5 border-bottom">
                            <div className="container px-5 my-5 px-5">
                                <div className="text-center mb-5">
                                    <h2 className="fw-bolder">Customer testimonials</h2>
                                    <p className="lead mb-0">Our customers love working with us</p>
                                </div>
                                <div className="row gx-5 justify-content-center">
                                    <div className="col-lg-6">
    
                                        <div className="card mb-4">
                                            <div className="card-body p-4">
                                                <div className="d-flex">
                                                    <div className="flex-shrink-0"><i className="bi bi-chat-right-quote-fill text-primary fs-1"></i></div>
                                                    <div className="ms-4">
                                                        <p className="mb-1">I never thought of the day where I could get top notch barber to come to my house to give me a haircut. Didn't have to wait 30 mins to drive to the barber shop then wait another 30 mins to finally get in a chair.  </p>
                                                        <div className="small text-muted">- Client Name, Location</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
    
                                        <div className="card">
                                            <div className="card-body p-4">
                                                <div className="d-flex">
                                                    <div className="flex-shrink-0"><i className="bi bi-chat-right-quote-fill text-primary fs-1"></i></div>
                                                    <div className="ms-4">
                                                        <p className="mb-1">I was skeptical at first but I really needed a hair cut for the weekend. the barber came me to after I was getting ready for the night and gave me one of the best haircuts I've ever recieved!</p>
                                                        <div className="small text-muted">- Client Name, Location</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
    
                        <section className="bg-light py-5">
                            <div className="container px-5 my-5 px-5">
                                <div className="text-center mb-5">
                                    <div className="feature bg-primary bg-gradient text-white rounded-3 mb-3"><i className="bi bi-envelope"></i></div>
                                    <h2 className="fw-bolder">Get in touch</h2>
                                    <p className="lead mb-0">We'd love to hear from you</p>
                                </div>
                                <div className="row gx-5 justify-content-center">
                                    <div className="col-lg-6">
    
    
    
                                        <form id="contactForm" data-sb-form-api-token="API_TOKEN">
    
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="name" type="text" placeholder="Enter your name..." data-sb-validations="required" />
                                                <label for="name">Full name</label>
                                                <div className="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                                            </div>
    
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="email" type="email" placeholder="name@example.com" data-sb-validations="required,email" />
                                                <label htmlFor="email">Email address</label>
                                                <div className="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                                                <div className="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                                            </div>
    
    
                                            <div className="form-floating mb-3">
                                                <input className="form-control" id="phone" type="tel" placeholder="(123) 456-7890" data-sb-validations="required" />
                                                <label htmlFor="phone">Phone number</label>
                                                <div className="invalid-feedback" data-sb-feedback="phone:required">A phone number is required.</div>
                                            </div>
    
    
                                            <div className="form-floating mb-3">
                                                <textarea className="form-control" id="message" type="text" placeholder="Enter your message here..." style={{ height: 10 + 'rem' }} data-sb-validations="required"></textarea>
                                                <label htmlFor="message">Message</label>
                                                <div className="invalid-feedback" data-sb-feedback="message:required">A message is required.</div>
                                            </div>
    
                                            <div className="d-none" id="submitSuccessMessage">
                                                <div className="text-center mb-3">
                                                    <div className="fw-bolder">Form submission successful!</div>
                                                    To activate this form, sign up at
                                                    <br />
                                                    <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                                                </div>
                                            </div>
    
                                            <div className="d-none" id="submitErrorMessage"><div className="text-center text-danger mb-3">Error sending message!</div></div>
    
                                            <div className="d-grid"><button className="btn btn-primary btn-lg disabled" id="submitButton" type="submit">Submit</button></div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>
            
  )
}
const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    type: state.auth.type
  });

export default connect(mapStateToProps)(Landing);