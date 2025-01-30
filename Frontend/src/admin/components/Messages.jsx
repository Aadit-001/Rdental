import { useState, useEffect } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { fireDB } from '../../firebase/firebaseConfig';
import { toast } from 'react-toastify';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Create a query to get messages ordered by timestamp
    const q = query(collection(fireDB, "messages"), orderBy("timestamp", "desc"));

    // Set up real-time listener
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = [];
      querySnapshot.forEach((doc) => {
        messagesData.push({ id: doc.id, ...doc.data() });
      });
      setMessages(messagesData);
      setLoading(false);
    });

    // Cleanup subscription
    return () => unsubscribe();
  }, []);

  const markAsRead = async (messageId) => {
    try {
      const messageRef = doc(fireDB, "messages", messageId);
      await updateDoc(messageRef, {
        status: 'read'
      });
      toast.success('Message marked as read', {
        position: "bottom-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } catch (error) {
      console.error("Error updating message:", error);
      toast.error('Failed to update message status');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-6">Messages</h2>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full align-middle">
          {messages.length === 0 ? (
            <div className="text-center py-4 text-gray-500">No messages yet</div>
          ) : (
            <div className="grid gap-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 rounded-lg border ${
                    message.status === 'unread'
                      ? 'bg-green-50 border-green-200'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{message.name}</h3>
                      <p className="text-sm text-gray-600">{message.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        {message.timestamp.toDate().toLocaleString()}
                      </span>
                      {message.status === 'unread' && (
                        <button
                          onClick={() => markAsRead(message.id)}
                          className="text-sm text-green-600 hover:text-green-700"
                        >
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                  <h4 className="font-medium mb-2">{message.subject}</h4>
                  <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
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
