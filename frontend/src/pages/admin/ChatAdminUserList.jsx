import NavBar from '../../components/NavBar';
import ChatUserList from '../../components/chat/ChatUserList';

const ChatAdminUserList = () => {
  return (
    <div className="container">
      <NavBar /> {/* Agrega el componente NavBar aquí */}
      <div className="centered-container" style={{ paddingTop: '64px' }}>
        <div className="content">
          <ChatUserList/>
        </div>
      </div>
    </div>
  );
}

export default ChatAdminUserList;
