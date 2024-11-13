import { Component } from 'react';
import ThemeContext from '../../context/ThemeContext';
import Cookies from 'js-cookie';
import { withRouter } from 'react-router-dom'; // Import withRouter to get history

import './index.css';

class UserProfilePage extends Component {
  state = { profile: { name: '', email: '' }, name: '', email: '', password: '', loading: false, error: '' };

  fetchProfile = async () => {
    try {
      const jwtToken = Cookies.get('jwt_token');
      const response = await fetch('https://todo-app-backend-2zeu.onrender.com/profile/', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        this.setState({ profile: data, name: data.name, email: data.email });
      } else {
        this.setState({ error: 'Failed to fetch user profile.' });
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      this.setState({ error: 'An error occurred. Please try again.' });
    }
  };

  componentDidMount() {
    this.fetchProfile();
  }

  handleUpdateProfile = async (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;
    this.setState({ loading: true, error: '' });

    const updateData = {
      name,
      email,
      ...(password && { password }),
    };

    try {
      const jwtToken = Cookies.get('jwt_token');
      const response = await fetch('https://todo-app-backend-2zeu.onrender.com/profile/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`,
        },
        body: JSON.stringify(updateData),
      });

      if (response.ok) {
        alert('Profile updated successfully!');
        this.setState({ password: '' });
      } else {
        const errorMessage = await response.text();
        this.setState({ error: errorMessage || 'Failed to update profile.' });
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      this.setState({ error: 'An error occurred. Please try again.' });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleDeleteProfile = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your profile? This action cannot be undone.');

    if (!confirmDelete) return;

    this.setState({ loading: true, error: '' });

    try {
      const jwtToken = Cookies.get('jwt_token');
      const response = await fetch('https://todo-app-backend-2zeu.onrender.com/profile/', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.ok) {
        alert('Profile deleted successfully!');
        Cookies.remove('jwt_token');
        this.props.history.push('/login'); // Redirect to login after deletion
      } else {
        const errorMessage = await response.text();
        this.setState({ error: errorMessage || 'Failed to delete profile.' });
      }
    } catch (err) {
      console.error('Error deleting profile:', err);
      this.setState({ error: 'An error occurred. Please try again.' });
    } finally {
      this.setState({ loading: false });
    }
  };

  handleGoBack = () => {
    this.props.history.push('/'); 
  };

  render() {
    const { name, email, password, loading, error } = this.state;
    return (
      <ThemeContext.Consumer>
        {(value) => {
          const { isDarkTheme } = value;
          return ( 
            <div className={`user-profile-container ${isDarkTheme ? 'dark-theme' : 'light-theme'}`}>
              <div className={`user-profile`}> 
                <h1>User Profile</h1>
                {error && <p className="error">{error}</p>}

                <form onSubmit={this.handleUpdateProfile}>
                  <div className="profile-form-group">
                    <label className='profile-label' htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      className='profile-input'
                      value={name}
                      onChange={(e) => this.setState({ name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="profile-form-group">
                    <label className='profile-label' htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      className='profile-input'
                      value={email}
                      onChange={(e) => this.setState({ email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="profile-form-group">
                    <label className='profile-label' htmlFor="password">New Password (Optional)</label>
                    <input
                      type="password"
                      id="password"
                      className='profile-input'
                      value={password}
                      onChange={(e) => this.setState({ password: e.target.value })}
                      placeholder="Enter new password"
                    />
                  </div>

                  <button className='update-button' type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update Profile'}
                  </button>
                </form>

                <button className="profile-delete-button" onClick={this.handleDeleteProfile} disabled={loading}>
                  {loading ? 'Deleting...' : 'Delete Profile'}
                </button>

                <button className="go-back-button" onClick={this.handleGoBack}>
                  Go Back to Home
                </button>
              </div>
            </div>
            
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

export default withRouter(UserProfilePage);
