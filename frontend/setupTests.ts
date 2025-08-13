import '@testing-library/jest-dom';

// Create a root div for ReactDOM.createRoot to attach to during tests
const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);
