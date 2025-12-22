/* Login Container - Full Screen Split Layout */
.login-container {
  display: flex;
  min-height: 100vh;
  width: 100%;
  overflow: hidden;
}

/* Left Panel Styles */
.login-left-panel {
  flex: 1;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
  overflow: hidden;
}

/* Decorative Shapes */
.decorative-shapes {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.shape {
  position: absolute;
  border-radius: 50px;
  transform: rotate(-45deg);
}

.shape-1 {
  width: 200px;
  height: 8px;
  background: linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,200,150,0.6));
  bottom: 25%;
  left: 5%;
}

.shape-2 {
  width: 300px;
  height: 8px;
  background: linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,180,100,0.7));
  bottom: 20%;
  left: 10%;
}

.shape-3 {
  width: 250px;
  height: 8px;
  background: linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,150,80,0.6));
  bottom: 15%;
  left: 0%;
}

.shape-4 {
  width: 150px;
  height: 6px;
  background: linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,220,180,0.5));
  top: 30%;
  right: 10%;
}

.shape-5 {
  width: 180px;
  height: 6px;
  background: linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,200,150,0.5));
  top: 35%;
  right: 5%;
}

.shape-6 {
  width: 120px;
  height: 5px;
  background: linear-gradient(90deg, rgba(255,255,255,0.1), rgba(255,180,120,0.4));
  bottom: 30%;
  left: 15%;
}

.circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 200, 150, 0.15);
}

.circle-1 {
  width: 300px;
  height: 300px;
  top: 5%;
  right: -50px;
}

.circle-2 {
  width: 200px;
  height: 200px;
  bottom: 10%;
  left: 20%;
  background: rgba(255, 180, 100, 0.1);
}

/* Welcome Content */
.welcome-content {
  position: relative;
  z-index: 1;
  max-width: 500px;
}

.welcome-title {
  font-size: 3rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 24px;
  line-height: 1.2;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.welcome-description {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  line-height: 1.8;
  font-weight: 400;
}

/* Right Panel Styles */
.login-right-panel {
  flex: 0 0 45%;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 60px;
}

.login-form-container {
  width: 100%;
  max-width: 380px;
}

.login-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #667eea;
  text-align: center;
  margin-bottom: 40px;
  letter-spacing: 2px;
}

/* Error Message */
.login-error {
  background: #fee2e2;
  border: 1px solid #fecaca;
  color: #dc2626;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  font-size: 0.875rem;
  text-align: center;
}

/* Input Group Styles */
.input-group {
  position: relative;
  margin-bottom: 20px;
}

.input-icon {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  color: #9ca3af;
  display: flex;
  align-items: center;
  justify-content: center;
}

.input-icon svg {
  width: 100%;
  height: 100%;
}

.login-input {
  width: 100%;
  padding: 16px 20px 16px 55px;
  border: none;
  border-radius: 30px;
  background: #e8e8f0;
  font-size: 1rem;
  color: #374151;
  transition: all 0.3s ease;
  outline: none;
}

.login-input::placeholder {
  color: #9ca3af;
}

.login-input:focus {
  background: #e0e0ec;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

/* Login Options - Remember & Forgot Password */
.login-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding: 0 5px;
}

/* Custom Checkbox */
.remember-checkbox {
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.remember-checkbox input {
  display: none;
}

.checkmark {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  background: #667eea;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  transition: all 0.3s ease;
}

.checkmark svg {
  width: 14px;
  height: 14px;
  color: #ffffff;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.remember-checkbox input:checked + .checkmark svg {
  opacity: 1;
}

.remember-checkbox input:not(:checked) + .checkmark {
  background: #e8e8f0;
}

.remember-text {
  font-size: 0.875rem;
  color: #6b7280;
}

.forgot-password-link {
  background: none;
  border: none;
  color: #6b7280;
  font-size: 0.875rem;
  cursor: pointer;
  transition: color 0.3s ease;
  padding: 0;
}

.forgot-password-link:hover {
  color: #667eea;
}

/* Login Button */
.login-button {
  width: 100%;
  max-width: 200px;
  margin: 0 auto;
  display: block;
  padding: 14px 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  border: none;
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

.login-button:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
}

.login-button:active:not(:disabled) {
  transform: translateY(0);
}

.login-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .login-left-panel {
    padding: 40px;
  }
  
  .login-right-panel {
    flex: 0 0 50%;
    padding: 40px;
  }
  
  .welcome-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }
  
  .login-left-panel {
    flex: none;
    min-height: 300px;
    padding: 40px 30px;
  }
  
  .login-right-panel {
    flex: 1;
    padding: 40px 30px;
  }
  
  .welcome-title {
    font-size: 2rem;
  }
  
  .welcome-description {
    font-size: 0.9rem;
  }
  
  .circle-1 {
    width: 200px;
    height: 200px;
  }
}

@media (max-width: 480px) {
  .login-left-panel {
    min-height: 250px;
    padding: 30px 20px;
  }
  
  .login-right-panel {
    padding: 30px 20px;
  }
  
  .welcome-title {
    font-size: 1.75rem;
  }
  
  .login-title {
    font-size: 1.25rem;
  }
  
  .login-input {
    padding: 14px 18px 14px 50px;
    font-size: 0.9rem;
  }
  
  .login-options {
    flex-direction: column;
    gap: 15px;
    align-items: flex-start;
  }
}