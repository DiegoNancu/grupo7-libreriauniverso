import NavBar from '../../components/NavBar';
import ChatBoxAdmin from '../../components/chat/ChatBoxAdmin';

const ChatAdmin = () => {
  return (
    <div className="container">
      <NavBar /> {/* Agrega el componente NavBar aquí */}
      <div className="centered-container" style={{ paddingTop: '64px' }}>
        <div className="content">
          <ChatBoxAdmin/>
        </div>
      </div>
    </div>
  );
}

export default ChatAdmin;
