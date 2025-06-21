import { useState } from 'react';
import { useUser } from '../../context/UserContex';
import { updateUserProfile, changeUserPassword } from '../../services/authService';
import { showToast } from '../../utils/toastHelper';
import Button from '../ui/button/Button';
import { Card, CardTitle, CardDescription } from '../ui/card';
import Input from '../form/input/InputField';
import Label from '../form/Label';

const ProfileSettings = () => {
  const { user, setUser } = useUser();
  const [name, setName] = useState(user?.name || '');

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUserProfile(name);
      setUser({ ...user!, name });
      showToast({ type: 'success', message: 'Profile updated successfully!' });
    } catch (error) {
      showToast({ type: 'error', message: 'Failed to update profile.' });
    }
  };

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logica pentru schimbarea parolei aici
    showToast({ type: 'success', message: 'Password changed successfully!' });
    e.currentTarget.reset();
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="p-4 sm:p-6">
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your account's profile information.</CardDescription>
        </div>
        <form onSubmit={handleProfileUpdate} className="p-4 sm:p-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={user?.email || ''} disabled className="bg-gray-100 dark:bg-gray-800" />
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your full name" />
          </div>
          <div className="flex justify-end">
            <Button size="sm">Update Profile</Button>
          </div>
        </form>
      </Card>

      <Card>
        <div className="p-4 sm:p-6">
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your password. Make sure it's a strong one.</CardDescription>
        </div>
        <form onSubmit={handlePasswordChange} className="p-4 sm:p-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
          <div>
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input id="currentPassword" type="password" placeholder="••••••••" />
          </div>
          <div>
            <Label htmlFor="newPassword">New Password</Label>
            <Input id="newPassword" type="password" placeholder="••••••••" />
          </div>
          <div>
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input id="confirmPassword" type="password" placeholder="••••••••" />
          </div>
          <div className="flex justify-end">
            <Button size="sm">Change Password</Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default ProfileSettings;