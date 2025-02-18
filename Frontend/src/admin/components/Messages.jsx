import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { fireDB } from '../../firebase/firebaseConfig';
import { toast } from 'react-toastify';

const toastConfig = {
  position: "bottom-right",
  autoClose: 1000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
};

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messagesQuery = query(
          collection(fireDB, "messages"), 
          orderBy("timestamp", "desc")
        );
        const querySnapshot = await getDocs(messagesQuery);
        const messagesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMessages(messagesData);
      } catch (error) {
        console.error("Error fetching messages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, []);

  const markAsRead = async (messageId) => {
    try {
      const messageRef = doc(fireDB, "messages", messageId);
      await updateDoc(messageRef, { status: 'read' });
      
      setMessages(prevMessages => prevMessages.map(message => 
        message.id === messageId 
          ? { ...message, status: 'read' }
          : message
      ));

      toast.success('Message marked as read', toastConfig);
    } catch (error) {
      console.error("Error updating message:", error);
      toast.error('Failed to update message status', toastConfig);
    }
  };

  const deleteMessage = async (messageId) => {
    if (!window.confirm('Are you sure you want to delete this message?')) return;
    
    try {
      const messageRef = doc(fireDB, "messages", messageId);
      await deleteDoc(messageRef);
      
      setMessages(prevMessages => prevMessages.filter(message => message.id !== messageId));
      toast.success('Message deleted successfully', toastConfig);
    } catch (error) {
      console.error("Error deleting message:", error);
      toast.error('Failed to delete message', toastConfig);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-4 sm:p-8 max-w-7xl mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-gray-800 border-b pb-4">Messages</h2>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          {messages.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-lg">
              <svg className="mx-auto h-12 w-12 text-gray-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
              No messages yet
            </div>
          ) : (
            <div className="grid gap-4 sm:gap-6">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 sm:p-6 rounded-xl border transition-all duration-200 hover:shadow-md ${
                    message.status === 'unread'
                      ? 'bg-green-50 border-green-300'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-0 mb-4">
                    <div>
                      <h3 className="font-semibold text-lg sm:text-xl text-gray-800">{message.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        <span className="inline-block mr-2">📧</span>
                        {message.email}
                      </p>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                      <span className="text-xs sm:text-sm text-gray-500 bg-gray-100 px-2 sm:px-3 py-1 rounded-full">
                        {message.timestamp.toDate().toLocaleString()}
                      </span>
                      <div className="flex gap-2 sm:gap-3">
                        {message.status === 'unread' && (
                          <button
                            onClick={() => markAsRead(message.id)}
                            className="text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full bg-green-100 text-green-700 hover:bg-green-200 transition-colors duration-200"
                          >
                            Mark as read
                          </button>
                        )}
                        <button
                          onClick={() => deleteMessage(message.id)}
                          className="text-xs sm:text-sm px-2 sm:px-3 py-1 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                  <h4 className="font-medium text-base sm:text-lg mb-2 sm:mb-3 text-gray-800">{message.subject}</h4>
                  <p className="text-sm sm:text-base text-gray-700 whitespace-pre-wrap leading-relaxed">{message.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messages;
