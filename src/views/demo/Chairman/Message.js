import React, { useState, useEffect } from 'react';
import { Button, Dialog } from 'components/ui';

const Message = () => {
  const [dialogIsOpen, setIsOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        setMessages(data.slice(0, 5));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const openDialog = (message) => {
    setSelectedMessage(message);
    setIsOpen(true);
  };

  const onDialogClose = () => {
    setIsOpen(false);
  };

  const onDialogOk = () => {
    setIsOpen(false);
  };

  return (
    <div>
      {messages.map((message) => (
        <div key={message.id} style={{ marginBottom: '10px' }}>
          <Button variant="solid" onClick={() => openDialog(message)}>
            Open Message {message.id}
          </Button>
        </div>
      ))}

      <Dialog isOpen={dialogIsOpen} onClose={onDialogClose}>
        {selectedMessage && (
          <div className="flex flex-col h-full justify-between">
            <h5 className="mb-4">Student Message {selectedMessage.id}</h5>
            <div className="max-h-96 overflow-y-auto">
              <p>{selectedMessage.body}</p>
            </div>
            <div className="text-right mt-6">
              <Button className="ltr:mr-2 rtl:ml-2" variant="plain" onClick={onDialogClose}>
                Cancel
              </Button>
              <Button variant="solid" onClick={onDialogOk}>
                Okay
              </Button>
            </div>
          </div>
        )}
      </Dialog>
    </div>
  );
};

export default Message;
