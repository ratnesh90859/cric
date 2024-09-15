import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    teamName: '',
    captain: { firstName: '', lastName: '' },
    players: Array(10).fill({ firstName: '', lastName: '' }), // 10 players
    substitutes: Array(4).fill({ firstName: '', lastName: '' }), // 4 substitutes
    email: '',
    phoneNumber: '',
    teamLogo: null,
    comments: '',
  });

  const handleInputChange = (e, index, type, group) => {
    if (group === 'players' || group === 'substitutes') {
      const newGroup = [...formData[group]];
      newGroup[index][type] = e.target.value;
      setFormData({ ...formData, [group]: newGroup });
    } else if (group === 'teamLogo') {
      setFormData({ ...formData, teamLogo: e.target.files[0] });
    } else {
      setFormData({ ...formData, [group]: { ...formData[group], [type]: e.target.value } });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('teamName', formData.teamName);
    form.append('captain', JSON.stringify(formData.captain));
    form.append('players', JSON.stringify(formData.players));
    form.append('substitutes', JSON.stringify(formData.substitutes));
    form.append('email', formData.email);
    form.append('phoneNumber', formData.phoneNumber);
    if (formData.teamLogo) form.append('teamLogo', formData.teamLogo);
    form.append('comments', formData.comments);

    try {
      await axios.post('http://localhost:5000/api/register', form);
      alert('Team Registered Successfully!');
    } catch (err) {
      console.error(err);
      alert('Error while registering team.');
    }
  };

  return (
    <div className="container mx-auto my-8 p-8 max-w-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold text-white mb-6 text-center">Tournament Registration Form</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
        <div className="mb-4">
          <label className="block text-lg font-medium text-gray-100">Team Name *</label>
          <input
            type="text"
            value={formData.teamName}
            onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
            className="w-full px-4 py-3 mt-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>
        <p className="mb-4 text-gray-100">Each team must have 11 players and 4 substitutes.</p>

        {/* Captain */}
        <h3 className="text-xl font-semibold text-white mb-3">Captain *</h3>
        <div className="flex space-x-4 mb-6">
          <input
            type="text"
            placeholder="First Name"
            value={formData.captain.firstName}
            onChange={(e) => handleInputChange(e, null, 'firstName', 'captain')}
            className="w-full px-4 py-3 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={formData.captain.lastName}
            onChange={(e) => handleInputChange(e, null, 'lastName', 'captain')}
            className="w-full px-4 py-3 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        {/* Players */}
        {formData.players.map((player, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-xl font-semibold text-white">Player #{index + 1} *</h3>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="First Name"
                value={player.firstName}
                onChange={(e) => handleInputChange(e, index, 'firstName', 'players')}
                className="w-full px-4 py-3 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={player.lastName}
                onChange={(e) => handleInputChange(e, index, 'lastName', 'players')}
                className="w-full px-4 py-3 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
          </div>
        ))}

        {/* Substitutes */}
        {formData.substitutes.map((substitute, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-xl font-semibold text-white">Substitute #{index + 1} *</h3>
            <div className="flex space-x-4">
              <input
                type="text"
                placeholder="First Name"
                value={substitute.firstName}
                onChange={(e) => handleInputChange(e, index, 'firstName', 'substitutes')}
                className="w-full px-4 py-3 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
              <input
                type="text"
                placeholder="Last Name"
                value={substitute.lastName}
                onChange={(e) => handleInputChange(e, index, 'lastName', 'substitutes')}
                className="w-full px-4 py-3 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
              />
            </div>
          </div>
        ))}

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-100">Contact Email *</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-3 mt-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-100">Phone Number *</label>
          <input
            type="text"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            className="w-full px-4 py-3 mt-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-100">Team Logo (Optional)</label>
          <input
            type="file"
            onChange={(e) => handleInputChange(e, null, null, 'teamLogo')}
            className="w-full px-4 py-3 mt-2 border border-gray-200 rounded-md shadow-sm focus:outline-none"
          />
        </div>

        <div className="mb-6">
          <label className="block text-lg font-medium text-gray-100">Comments</label>
          <textarea
            value={formData.comments}
            onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
            className="w-full px-4 py-3 mt-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-3 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-semibold rounded-md shadow-lg hover:from-indigo-600 hover:via-purple-600 hover:to-pink-600 transition duration-300"
        >
          Register Team
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
