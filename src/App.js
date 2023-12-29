import './App.css';
import { Route, Routes } from "react-router-dom";
import Navs from './components/navs/firstnav';
import MainNavbar from './components/navs/mainNav';
import SecondNavbar from './components/navs/secondnav';
import MySlider from './components/homepage/slider';
import Home from './components/homepage/home';
import Footer from './components/homepage/footer';
import Reservation from './components/programeReservation/first';
import FirstDining from './components/dining/firstDining';
import ImageGallery from './components/dining/resturants';
import First_gallery from './components/gallery/first gallery';
import QRCodePage from './components/programeReservation/qrcode';
import SignIn from './components/sign/signin';
import SignUpComponent from './components/sign/signup';
import SignInSignUp from './components/sign/signinsignup';
import Programpage from './components/program/programpage';
import Reservations from './components/reservations/Reservations';
import Booking from './components/booking/book1';
import PaymentMethod from './components/booking/book2';
import FinalBook from './components/booking/book3';
import AboutUsPage from './components/about us/about';
import Videos from './components/videos/videos';
import Membership from './components/membership/membership';
import ContactUs from './components/contact/contactus';
import MyProfile from './components/profile/myprofile';
import { useContext, useEffect } from 'react';
import { AuthContext } from './components/context/AuthContext';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Protectroute from './components/privateRoute/Protectedroute';
function App() {
  const auth = useContext(AuthContext)
  useEffect(()=>{
    auth.logout();
  },[])
  return (
    <>
    <MainNavbar ></MainNavbar>
     {/* <Navs> </Navs> */}
     {/* <SecondNavbar></SecondNavbar> */}
     {/* <MySlider></MySlider>
     <Welcome/>  */}
     
 <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/programs/:id" element={<Reservation/>} />
    <Route path="/reservation" element={<Protectroute><Reservations/></Protectroute>} />
    <Route path='/dining' element={<FirstDining/>} />
    <Route path='/restaurants' element={<ImageGallery/>} />
    <Route path='/gallery' element={<First_gallery />} />
    <Route path='/signin' element={<SignInSignUp />} />
    <Route path='/signup' element={<SignUpComponent />} />
    <Route path='/program' element={<Programpage/>} />
    <Route path='/booking' element={<Booking/>} />
    <Route path='/payment' element={<PaymentMethod/>} />
    <Route path='/aboutus' element={<AboutUsPage/>} />
    <Route path='/videos' element={<Videos/>} />
    <Route path='/membership' element={<Membership/>} />
    <Route path='/contactus' element={<ContactUs/>} />
    <Route exact path="/qrbook" element={<FinalBook/>} /> 
    <Route exact path="/profile" element={<Protectroute><MyProfile/></Protectroute>} />
 </Routes>
 <Footer ></Footer>
 <ToastContainer />
      {/* <Footer></Footer> */}
    </>
  );
}

export default App;
