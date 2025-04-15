import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  padding: 3rem;
  border-radius: 12px;
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
`;

const Card = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 0.5rem;
  display: block;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    outline: none;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;

  &:focus {
    border-color: #6366f1;
    box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
    outline: none;
  }
`;

const Button = styled.button`
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(99, 102, 241, 0.2);
  }

  &:disabled {
    background: #cbd5e0;
    cursor: not-allowed;
    transform: none;
  }
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

  h3 {
    color: #4a5568;
    margin-bottom: 0.5rem;
  }

  p {
    color: #718096;
    font-size: 0.95rem;
  }
`;

const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const LoadingContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  text-align: center;

  h3 {
    margin-bottom: 1rem;
    color: #4a5568;
  }

  p {
    color: #718096;
  }
`;

const ResponseCard = styled(Card)`
  pre {
    background: #2d3748;
    color: #e2e8f0;
    padding: 1rem;
    border-radius: 8px;
    overflow-x: auto;
    margin-top: 1rem;
  }

  h3 {
    color: #4a5568;
    margin-bottom: 1rem;
  }
`;

const CodeSection = styled.div`
  margin-top: 2rem;
`;

const FileTab = styled.button`
  padding: 0.5rem 1rem;
  background: ${props => props.active ? '#6366f1' : '#e2e8f0'};
  color: ${props => props.active ? 'white' : '#4a5568'};
  border: none;
  border-radius: 6px;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;

  &:hover {
    background: ${props => props.active ? '#6366f1' : '#cbd5e0'};
  }
`;

const DownloadButton = styled(Button)`
  background: #10b981;
  margin-top: 1rem;

  &:hover {
    background: #059669;
  }
`;

const CodePreview = styled.pre`
  background: #2d3748;
  color: #e2e8f0;
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  margin-top: 1rem;
  font-family: 'Fira Code', monospace;
  line-height: 1.5;
`;

const PreviewCard = styled(Card)`
  margin-top: 2rem;
`;

const PreviewTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  
  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }
  
  th {
    background-color: #f7fafc;
    font-weight: 600;
  }
`;

const PreviewForm = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  
  input {
    flex: 1;
    padding: 0.5rem;
    border: 1px solid #e2e8f0;
    border-radius: 0.375rem;
  }
  
  button {
    padding: 0.5rem 1rem;
    background-color: #6366f1;
    color: white;
    border: none;
    border-radius: 0.375rem;
    cursor: pointer;
    
    &:hover {
      background-color: #4f46e5;
    }
  }
`;

const ActionButton = styled.button`
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  margin-right: 0.5rem;
  
  &.edit {
    background-color: #3b82f6;
    color: white;
    
    &:hover {
      background-color: #2563eb;
    }
  }
  
  &.delete {
    background-color: #ef4444;
    color: white;
    
    &:hover {
      background-color: #dc2626;
    }
  }
`;

const PreviewSection = styled.div`
  margin-top: 2rem;
`;

const PreviewIframe = styled.iframe`
  width: 100%;
  height: 600px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  margin-top: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

function CrudPreview() {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/crud/data');
      const data = await res.json();
      if (data.success) {
        setItems(data.data);
      }
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        const res = await fetch(`http://localhost:5000/api/crud/data/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (data.success) {
          setItems(items.map(item => 
            item.id === editingId ? data.item : item
          ));
          setEditingId(null);
        }
      } else {
        const res = await fetch('http://localhost:5000/api/crud/data', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await res.json();
        if (data.success) {
          setItems([...items, data.item]);
        }
      }
      setFormData({ name: '', email: '' });
    } catch (err) {
      console.error('Error saving item:', err);
    }
  };

  const handleEdit = (item) => {
    setFormData({ name: item.name, email: item.email });
    setEditingId(item.id);
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/crud/data/${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.success) {
        setItems(items.filter(item => item.id !== id));
      }
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  return (
    <PreviewCard>
      <h3>Live Preview</h3>
      <PreviewForm onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <button type="submit">
          {editingId ? 'Update' : 'Add'} Item
        </button>
      </PreviewForm>

      <PreviewTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>
                <ActionButton
                  className="edit"
                  onClick={() => handleEdit(item)}
                >
                  Edit
                </ActionButton>
                <ActionButton
                  className="delete"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </ActionButton>
              </td>
            </tr>
          ))}
        </tbody>
      </PreviewTable>
    </PreviewCard>
  );
}

function processHtmlForPreview(files) {
  let html = files['index.html'];
  
  // Process CSS files and embed them in the HTML
  Object.keys(files).forEach(filename => {
    if (filename.endsWith('.css')) {
      // Embed CSS directly in the HTML
      html = html.replace(
        '<link rel="stylesheet" href="' + filename + '">',
        '<style>' + files[filename] + '</style>'
      );
    }
  });
  
  // Convert relative image paths to data URLs for common image placeholders
  html = html.replace(/src="([^"]+\.(jpg|jpeg|png|gif|svg))"/g, (match, imgPath) => {
    // Check if this is a reference to an actual file in our response
    if (files[imgPath]) {
      return 'src="data:image/' + imgPath.split('.').pop() + ';base64,' + btoa(files[imgPath]) + '"';
    }
    
    // If not found in files, use a placeholder image
    return 'src="data:image/svg+xml;charset=UTF-8,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#e2e8f0"/><text x="50%" y="50%" font-family="Arial" font-size="20" text-anchor="middle" dy=".3em">Image</text></svg>') + '"';
  });
  
  // Handle JavaScript files by embedding them in the HTML
  Object.keys(files).forEach(filename => {
    if (filename.endsWith('.js')) {
      // Append scripts to the end of body
      html = html.replace(
        '</body>',
        '<script>' + files[filename] + '</script></body>'
      );
    }
  });
  
  // Add enhanced dummy data and interactivity script
  const dummyDataAndInteractivityScript = 
    '<script>\n' +
    '  (function() {\n' +
    '    // Store state for the preview\n' +
    '    window.previewState = {\n' +
    '      initialized: false,\n' +
    '      clickCount: {},\n' +
    '      items: [],\n' +
    '      messages: [],\n' +
    '      events: [],\n' +
    '      users: []\n' +
    '    };\n' +
    '    \n' +
    '    // Initialize dummy data based on page content detection\n' +
    '    function initializeDummyData() {\n' +
    '      if (window.previewState.initialized) return;\n' +
    '      \n' +
    '      const pageContent = document.body.innerHTML.toLowerCase();\n' +
    '      \n' +
    '      // Create dummy products for e-commerce sites\n' +
    '      if (pageContent.includes("add to cart") || \n' +
    '          pageContent.includes("product") || \n' +
    '          pageContent.includes("shop") || \n' +
    '          pageContent.includes("store") ||\n' +
    '          pageContent.includes("price")) {\n' +
    '        \n' +
    '        window.previewState.items = [\n' +
    '          { id: 1, name: "Product 1", price: "$29.99", image: "product1.jpg", description: "This is the first product description." },\n' +
    '          { id: 2, name: "Product 2", price: "$39.99", image: "product2.jpg", description: "This is the second product description." },\n' +
    '          { id: 3, name: "Product 3", price: "$49.99", image: "product3.jpg", description: "This is the third product description." }\n' +
    '        ];\n' +
    '        \n' +
    '        window.previewState.cart = [];\n' +
    '      }\n' +
    '      \n' +
    '      // Create dummy messages for messaging/chat apps\n' +
    '      if (pageContent.includes("message") || \n' +
    '          pageContent.includes("chat") || \n' +
    '          pageContent.includes("send")) {\n' +
    '        \n' +
    '        window.previewState.messages = [\n' +
    '          { id: 1, sender: "User 1", text: "Hello, how are you?", time: "10:30 AM" },\n' +
    '          { id: 2, sender: "User 2", text: "I\'m good, thanks for asking!", time: "10:32 AM" },\n' +
    '          { id: 3, sender: "User 1", text: "What are you doing today?", time: "10:33 AM" }\n' +
    '        ];\n' +
    '      }\n' +
    '      \n' +
    '      // Create dummy events for calendar/event apps\n' +
    '      if (pageContent.includes("event") || \n' +
    '          pageContent.includes("calendar") || \n' +
    '          pageContent.includes("schedule")) {\n' +
    '        \n' +
    '        window.previewState.events = [\n' +
    '          { id: 1, title: "Team Meeting", date: "2023-11-15", time: "10:00 AM", location: "Conference Room" },\n' +
    '          { id: 2, title: "Lunch with Client", date: "2023-11-16", time: "12:30 PM", location: "Restaurant" },\n' +
    '          { id: 3, title: "Project Deadline", date: "2023-11-20", time: "5:00 PM", location: "Office" }\n' +
    '        ];\n' +
    '      }\n' +
    '      \n' +
    '      // Create dummy users for user management/login systems\n' +
    '      if (pageContent.includes("user") || \n' +
    '          pageContent.includes("login") || \n' +
    '          pageContent.includes("account") ||\n' +
    '          pageContent.includes("profile")) {\n' +
    '        \n' +
    '        window.previewState.users = [\n' +
    '          { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },\n' +
    '          { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },\n' +
    '          { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "User" }\n' +
    '        ];\n' +
    '      }\n' +
    '      \n' +
    '      window.previewState.initialized = true;\n' +
    '    }\n' +
    '    \n' +
    '    // Enhance the page with dummy data\n' +
    '    function enhancePageWithDummyData() {\n' +
    '      const pageContent = document.body.innerHTML.toLowerCase();\n' +
    '      \n' +
    '      // Add dummy products to product listings\n' +
    '      if (window.previewState.items.length > 0) {\n' +
    '        const productContainers = document.querySelectorAll(".products, .product-list, .items, [class*=\\"product\\"], [class*=\\"item\\"]");\n' +
    '        \n' +
    '        if (productContainers.length === 0) {\n' +
    '          // Try to find potential product containers\n' +
    '          const potentialContainers = Array.from(document.querySelectorAll("div, section, ul")).filter(el => {\n' +
    '            return el.children.length > 1 && \n' +
    '                  (el.innerHTML.toLowerCase().includes("product") || \n' +
    '                   el.innerHTML.toLowerCase().includes("item") ||\n' +
    '                   el.innerHTML.toLowerCase().includes("price"));\n' +
    '          });\n' +
    '          \n' +
    '          if (potentialContainers.length > 0) {\n' +
    '            injectProductsIntoDom(potentialContainers[0]);\n' +
    '          }\n' +
    '        } else {\n' +
    '          productContainers.forEach(container => {\n' +
    '            injectProductsIntoDom(container);\n' +
    '          });\n' +
    '        }\n' +
    '      }\n' +
    '      \n' +
    '      // Add interaction to "Add to Cart" buttons\n' +
    '      const addToCartButtons = Array.from(document.querySelectorAll("button, a, .button")).filter(el => {\n' +
    '        const text = el.textContent.toLowerCase();\n' +
    '        return text.includes("add to cart") || \n' +
    '               text.includes("buy now") || \n' +
    '               text.includes("purchase") ||\n' +
    '               el.className.toLowerCase().includes("cart");\n' +
    '      });\n' +
    '      \n' +
    '      addToCartButtons.forEach(button => {\n' +
    '        if (!button.hasAttribute("data-preview-enhanced")) {\n' +
    '          button.setAttribute("data-preview-enhanced", "true");\n' +
    '          button.addEventListener("click", function(e) {\n' +
    '            e.preventDefault();\n' +
    '            e.stopPropagation();\n' +
    '            \n' +
    '            // Find product info from closest container\n' +
    '            const container = button.closest("div, li, article, section");\n' +
    '            let productName = "Product";\n' +
    '            let productPrice = "$0.00";\n' +
    '            \n' +
    '            if (container) {\n' +
    '              const nameEl = container.querySelector("h1, h2, h3, h4, .name, .title, [class*=\\"name\\"], [class*=\\"title\\"]");\n' +
    '              if (nameEl) productName = nameEl.textContent.trim();\n' +
    '              \n' +
    '              const priceEl = container.querySelector(".price, [class*=\\"price\\"]");\n' +
    '              if (priceEl) productPrice = priceEl.textContent.trim();\n' +
    '            }\n' +
    '            \n' +
    '            // Add to cart\n' +
    '            window.previewState.cart = window.previewState.cart || [];\n' +
    '            window.previewState.cart.push({\n' +
    '              id: Date.now(),\n' +
    '              name: productName,\n' +
    '              price: productPrice,\n' +
    '              quantity: 1\n' +
    '            });\n' +
    '            \n' +
    '            // Show notification\n' +
    '            showNotification("Added to cart: " + productName, "success");\n' +
    '            \n' +
    '            // Update cart counter if exists\n' +
    '            updateCartCounter();\n' +
    '          });\n' +
    '        }\n' +
    '      });\n' +
    '      \n' +
    '      // Add functionality to message sending\n' +
    '      if (window.previewState.messages.length > 0) {\n' +
    '        const messageForm = document.querySelector("form");\n' +
    '        const messageInput = document.querySelector("input[type=\\"text\\"], textarea");\n' +
    '        \n' +
    '        if (messageForm && messageInput && !messageForm.hasAttribute("data-preview-enhanced")) {\n' +
    '          messageForm.setAttribute("data-preview-enhanced", "true");\n' +
    '          messageForm.addEventListener("submit", function(e) {\n' +
    '            e.preventDefault();\n' +
    '            \n' +
    '            if (messageInput.value.trim()) {\n' +
    '              const newMessage = {\n' +
    '                id: Date.now(),\n' +
    '                sender: "You",\n' +
    '                text: messageInput.value.trim(),\n' +
    '                time: new Date().toLocaleTimeString([], {hour: "2-digit", minute:"2-digit"})\n' +
    '              };\n' +
    '              \n' +
    '              window.previewState.messages.push(newMessage);\n' +
    '              messageInput.value = "";\n' +
    '              \n' +
    '              // Try to add message to the UI\n' +
    '              const messageContainer = document.querySelector(".messages, .chat, .message-list, [class*=\\"message\\"], [class*=\\"chat\\"]");\n' +
    '              if (messageContainer) {\n' +
    '                const messageElement = document.createElement("div");\n' +
    '                messageElement.className = "message user-message";\n' +
    '                messageElement.innerHTML = \n' +
    '                  \'<div class="message-sender">\' + newMessage.sender + \'</div>\' +\n' +
    '                  \'<div class="message-text">\' + newMessage.text + \'</div>\' +\n' +
    '                  \'<div class="message-time">\' + newMessage.time + \'</div>\';\n' +
    '                messageContainer.appendChild(messageElement);\n' +
    '                messageContainer.scrollTop = messageContainer.scrollHeight;\n' +
    '              }\n' +
    '              \n' +
    '              showNotification("Message sent!", "success");\n' +
    '            }\n' +
    '          });\n' +
    '        }\n' +
    '      }\n' +
    '    }\n' +
    '    \n' +
    '    // Helper function to inject products into DOM\n' +
    '    function injectProductsIntoDom(container) {\n' +
    '      // Check if container already has product children\n' +
    '      if (container.querySelectorAll("*").length > 5 && !container.hasAttribute("data-empty-container")) {\n' +
    '        return; // Container already has content\n' +
    '      }\n' +
    '      \n' +
    '      container.setAttribute("data-empty-container", "true");\n' +
    '      container.innerHTML = ""; // Clear container\n' +
    '      \n' +
    '      // Create and append product elements\n' +
    '      window.previewState.items.forEach(item => {\n' +
    '        const productEl = document.createElement("div");\n' +
    '        productEl.className = "product-item";\n' +
    '        productEl.style.margin = "10px";\n' +
    '        productEl.style.padding = "15px";\n' +
    '        productEl.style.border = "1px solid #e2e8f0";\n' +
    '        productEl.style.borderRadius = "8px";\n' +
    '        \n' +
    '        productEl.innerHTML = \n' +
    '          \'<div style="width: 200px; height: 200px; background-color: #e2e8f0; display: flex; align-items: center; justify-content: center; margin-bottom: 10px;">\' +\n' +
    '          \'  <span style="color: #718096;">Product Image</span>\' +\n' +
    '          \'</div>\' +\n' +
    '          \'<h3 style="margin: 10px 0; font-size: 18px;">\' + item.name + \'</h3>\' +\n' +
    '          \'<p style="color: #718096; margin-bottom: 10px;">\' + item.description + \'</p>\' +\n' +
    '          \'<div style="display: flex; justify-content: space-between; align-items: center;">\' +\n' +
    '          \'  <span style="font-weight: bold; font-size: 18px;">\' + item.price + \'</span>\' +\n' +
    '          \'  <button style="background-color: #4CAF50; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer;">\' +\n' +
    '          \'    Add to Cart\' +\n' +
    '          \'  </button>\' +\n' +
    '          \'</div>\';\n' +
    '        \n' +
    '        container.appendChild(productEl);\n' +
    '      });\n' +
    '    }\n' +
    '    \n' +
    '    // Helper function to update cart counter\n' +
    '    function updateCartCounter() {\n' +
    '      let cartCount = window.previewState.cart.length;\n' +
    '      \n' +
    '      // Find or create cart counter\n' +
    '      let counter = document.querySelector(".cart-count, .cart-counter, [class*=\\"cart-count\\"]");\n' +
    '      \n' +
    '      if (!counter) {\n' +
    '        // Look for cart icon or link\n' +
    '        const cartLink = Array.from(document.querySelectorAll("a, div, span")).find(el => \n' +
    '          el.innerHTML.toLowerCase().includes("cart") || \n' +
    '          el.className.toLowerCase().includes("cart")\n' +
    '        );\n' +
    '        \n' +
    '        if (cartLink) {\n' +
    '          counter = document.createElement("span");\n' +
    '          counter.className = "cart-counter";\n' +
    '          counter.style.background = "#ff5722";\n' +
    '          counter.style.color = "white";\n' +
    '          counter.style.borderRadius = "50%";\n' +
    '          counter.style.padding = "2px 6px";\n' +
    '          counter.style.fontSize = "12px";\n' +
    '          counter.style.position = "relative";\n' +
    '          counter.style.marginLeft = "5px";\n' +
    '          \n' +
    '          cartLink.appendChild(counter);\n' +
    '        } else {\n' +
    '          // Create floating cart counter\n' +
    '          counter = document.createElement("div");\n' +
    '          counter.className = "cart-counter";\n' +
    '          counter.style.position = "fixed";\n' +
    '          counter.style.top = "10px";\n' +
    '          counter.style.right = "10px";\n' +
    '          counter.style.background = "#ff5722";\n' +
    '          counter.style.color = "white";\n' +
    '          counter.style.borderRadius = "50%";\n' +
    '          counter.style.width = "20px";\n' +
    '          counter.style.height = "20px";\n' +
    '          counter.style.display = "flex";\n' +
    '          counter.style.alignItems = "center";\n' +
    '          counter.style.justifyContent = "center";\n' +
    '          counter.style.fontSize = "12px";\n' +
    '          counter.style.zIndex = "9999";\n' +
    '          \n' +
    '          document.body.appendChild(counter);\n' +
    '        }\n' +
    '      }\n' +
    '      \n' +
    '      counter.textContent = cartCount.toString();\n' +
    '      counter.style.display = cartCount > 0 ? "block" : "none";\n' +
    '    }\n' +
    '    \n' +
    '    // Helper function to show notifications\n' +
    '    function showNotification(message, type) {\n' +
    '      if (!type) type = "info";\n' +
    '      const notification = document.createElement("div");\n' +
    '      notification.style.position = "fixed";\n' +
    '      notification.style.top = "20px";\n' +
    '      notification.style.right = "20px";\n' +
    '      notification.style.padding = "15px 20px";\n' +
    '      notification.style.color = "white";\n' +
    '      notification.style.borderRadius = "5px";\n' +
    '      notification.style.boxShadow = "0 2px 4px rgba(0,0,0,0.2)";\n' +
    '      notification.style.zIndex = "9999";\n' +
    '      notification.style.opacity = "0";\n' +
    '      notification.style.transition = "opacity 0.3s ease";\n' +
    '      \n' +
    '      if (type === "success") {\n' +
    '        notification.style.backgroundColor = "#4CAF50";\n' +
    '      } else if (type === "error") {\n' +
    '        notification.style.backgroundColor = "#f44336";\n' +
    '      } else {\n' +
    '        notification.style.backgroundColor = "#2196F3";\n' +
    '      }\n' +
    '      \n' +
    '      notification.textContent = message;\n' +
    '      \n' +
    '      document.body.appendChild(notification);\n' +
    '      \n' +
    '      setTimeout(function() { notification.style.opacity = "1"; }, 10);\n' +
    '      setTimeout(function() {\n' +
    '        notification.style.opacity = "0";\n' +
    '        setTimeout(function() { document.body.removeChild(notification); }, 300);\n' +
    '      }, 3000);\n' +
    '    }\n' +
    '    \n' +
    '    // Initialize and make all buttons interactive\n' +
    '    document.addEventListener("DOMContentLoaded", function() {\n' +
    '      // Initialize dummy data\n' +
    '      initializeDummyData();\n' +
    '      \n' +
    '      // Enhance page with dummy data\n' +
    '      enhancePageWithDummyData();\n' +
    '      \n' +
    '      // Make all buttons and interactive elements respond to clicks\n' +
    '      const allButtons = document.querySelectorAll("button, .button, input[type=\\"button\\"], input[type=\\"submit\\"], a[href=\\"#\\"], a.button");\n' +
    '      \n' +
    '      allButtons.forEach(function(button, index) {\n' +
    '        if (!button.hasAttribute("data-preview-enhanced")) {\n' +
    '          const buttonId = "btn-" + index;\n' +
    '          button.setAttribute("data-button-id", buttonId);\n' +
    '          window.previewState.clickCount[buttonId] = 0;\n' +
    '          \n' +
    '          button.addEventListener("click", function(e) {\n' +
    '            if (e.defaultPrevented) return;\n' +
    '            e.preventDefault();\n' +
    '            \n' +
    '            // Increment click count\n' +
    '            window.previewState.clickCount[buttonId]++;\n' +
    '            \n' +
    '            // Visual feedback\n' +
    '            const originalBg = button.style.backgroundColor;\n' +
    '            const originalColor = button.style.color;\n' +
    '            \n' +
    '            button.style.backgroundColor = "#4CAF50";\n' +
    '            button.style.color = "white";\n' +
    '            \n' +
    '            setTimeout(function() {\n' +
    '              button.style.backgroundColor = originalBg;\n' +
    '              button.style.color = originalColor;\n' +
    '              \n' +
    '              // Show notification\n' +
    '              const buttonText = button.textContent || button.value || "Button";\n' +
    '              showNotification("Action: " + buttonText.trim());\n' +
    '            }, 200);\n' +
    '          });\n' +
    '        }\n' +
    '      });\n' +
    '      \n' +
    '      // Handle form submissions\n' +
    '      const forms = document.querySelectorAll("form");\n' +
    '      forms.forEach(function(form) {\n' +
    '        if (!form.hasAttribute("data-preview-enhanced")) {\n' +
    '          form.addEventListener("submit", function(e) {\n' +
    '            if (e.defaultPrevented) return;\n' +
    '            e.preventDefault();\n' +
    '            \n' +
    '            // Get form data\n' +
    '            const formData = {};\n' +
    '            const inputs = form.querySelectorAll("input, select, textarea");\n' +
    '            inputs.forEach(function(input) {\n' +
    '              if (input.name) {\n' +
    '                formData[input.name] = input.value;\n' +
    '              }\n' +
    '            });\n' +
    '            \n' +
    '            // Show submission confirmation\n' +
    '            showNotification("Form submitted successfully", "success");\n' +
    '            \n' +
    '            // Reset form\n' +
    '            form.reset();\n' +
    '          });\n' +
    '        }\n' +
    '      });\n' +
    '    });\n' +
    '  })();\n' +
    '</script>';
  
  html = html.replace('</body>', dummyDataAndInteractivityScript + '</body>');
  
  return html;
}

function App() {
  const [formData, setFormData] = useState({
    prompt: '',
    type: 'Web Application'
  });
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [activeFile, setActiveFile] = useState(null);
  const [promptHistory, setPromptHistory] = useState([]);

  useEffect(() => {
    fetchPromptHistory();
  }, []);

  const fetchPromptHistory = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/history');
      const data = await res.json();
      if (data.success) {
        setPromptHistory(data.history);
      }
    } catch (err) {
      console.error('Error fetching history:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResponse(null);
    setActiveFile(null);

    try {
      const res = await fetch('http://localhost:5000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: formData.prompt,
          type: formData.type
        }),
      });

      const data = await res.json();

      if (!data.success) {
        throw new Error(data.error || 'Failed to generate code');
      }

      setResponse(data);
      // Set the first file as active
      setActiveFile(Object.keys(data.files)[0]);
      // Fetch updated history after successful generation
      fetchPromptHistory();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (response?.downloadPath) {
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = `http://localhost:5000${response.downloadPath}`;
      link.setAttribute('download', 'project.zip');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <Container>
      <Header>
        <Title>AI Coding Agent</Title>
        <Subtitle>
          Transform your ideas into working applications with the power of AI.
          Just describe what you want to build, and let our AI handle the coding.
        </Subtitle>
      </Header>

      <Card>
        <Form onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="prompt">Describe Your Application</Label>
            <TextArea
              id="prompt"
              placeholder="Example: Create a CRUD application for managing users with name, email, and phone fields..."
              value={formData.prompt}
              onChange={(e) => setFormData({ ...formData, prompt: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="type">Project Type</Label>
            <Select
              id="type"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="web">Web Application</option>
              <option value="mobile">Mobile Application</option>
              <option value="desktop">Desktop Application</option>
            </Select>
          </div>

          <Button type="submit" disabled={!formData.prompt || loading}>
            {loading ? 'Generating...' : 'Generate Application'}
          </Button>
        </Form>
      </Card>

      {error && (
        <ResponseCard>
          <h3>Error</h3>
          <p style={{ color: '#e53e3e' }}>{error}</p>
        </ResponseCard>
      )}

      {response && (
        <>
          <ResponseCard>
            <h3>Generated Code Files</h3>
            <div>
              {Object.keys(response.files).map((filename) => (
                <FileTab
                  key={filename}
                  active={activeFile === filename}
                  onClick={() => setActiveFile(filename)}
                >
                  {filename}
                </FileTab>
              ))}
            </div>
            
            {activeFile && (
              <CodeSection>
                <h4>{activeFile}</h4>
                <CodePreview>{response.files[activeFile]}</CodePreview>
              </CodeSection>
            )}

            <DownloadButton onClick={handleDownload}>
              Download Project Files
            </DownloadButton>
          </ResponseCard>

          {/* Dynamic Preview Section */}
          <PreviewCard>
            <h3>Live Preview</h3>
            {formData.prompt.toLowerCase().includes('crud') ? (
              // CRUD Application Preview
              <>
                <PreviewForm>
                  <input type="text" placeholder="Name" />
                  <input type="email" placeholder="Email" />
                  <button type="submit">Add Item</button>
                </PreviewForm>

                <PreviewTable>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>John Doe</td>
                      <td>john@example.com</td>
                      <td>
                        <ActionButton className="edit">Edit</ActionButton>
                        <ActionButton className="delete">Delete</ActionButton>
                      </td>
                    </tr>
                    <tr>
                      <td>Jane Smith</td>
                      <td>jane@example.com</td>
                      <td>
                        <ActionButton className="edit">Edit</ActionButton>
                        <ActionButton className="delete">Delete</ActionButton>
                      </td>
                    </tr>
                  </tbody>
                </PreviewTable>
              </>
            ) : response.files['index.html'] ? (
              // Static Website Preview (Restaurant, Portfolio, etc.)
              <PreviewIframe
                srcDoc={processHtmlForPreview(response.files)}
                title="Live Preview"
                sandbox="allow-same-origin allow-scripts"
              />
            ) : (
              // Default message for other types
              <p style={{ textAlign: 'center', color: '#718096', padding: '2rem' }}>
                Preview not available for this type of application.
                Please download the project files to run it locally.
              </p>
            )}
          </PreviewCard>
        </>
      )}

      {promptHistory.length > 0 && (
        <Card style={{ marginTop: '2rem' }}>
          <h3 style={{ color: '#4a5568', marginBottom: '1rem' }}>Prompt History</h3>
          {promptHistory.map((item) => (
            <div
              key={item._id}
              style={{
                padding: '1rem',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                marginBottom: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s'
              }}
            >
              <p style={{ color: '#4a5568', marginBottom: '0.5rem' }}>{item.prompt}</p>
              <small style={{ color: '#718096' }}>
                {new Date(item.createdAt).toLocaleString()} - {item.type}
              </small>
            </div>
          ))}
        </Card>
      )}

      {!response && !error && (
        <FeatureGrid>
          <FeatureCard>
            <h3>Complete CRUD Applications</h3>
            <p>Generate full-stack CRUD applications with frontend forms, backend API, and database integration.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Ready to Run</h3>
            <p>Get fully functional code that you can run immediately with proper setup and dependencies.</p>
          </FeatureCard>
          <FeatureCard>
            <h3>Best Practices</h3>
            <p>Generated code follows modern development practices with proper error handling and validation.</p>
          </FeatureCard>
        </FeatureGrid>
      )}

      {loading && (
        <LoadingOverlay>
          <LoadingContent>
            <h3>Generating Your Application</h3>
            <p>Please wait while our AI creates your CRUD application...</p>
          </LoadingContent>
        </LoadingOverlay>
      )}
    </Container>
  );
}

export default App; 