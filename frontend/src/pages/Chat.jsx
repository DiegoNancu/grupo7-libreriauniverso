import NavBar from '../components/NavBar';
import ChatBox from '../components/chat/ChatBox';


const Chat = () => {
  return (
    <div className="container">
      <NavBar /> {/* Agrega el componente NavBar aquí */}
      <div className="centered-container" style={{ paddingTop: '80px' }}>
        <div className="content">
          <ChatBox/>
        </div>
      </div>
    </div>
  );
}

export default Chat;
