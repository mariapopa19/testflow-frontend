import { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { getUserApiKey, regenerateUserApiKey } from '../../services/authService';
import { showToast } from '../../utils/toastHelper';
import Button from '../ui/button/Button';
import { Card, CardTitle, CardDescription } from '../ui/card';
import Checkbox from '../form/input/Checkbox';
import Input from '../form/input/InputField';
import Label from '../form/Label';
import Radio from '../form/input/Radio';
import { Copy, Eye, EyeOff } from 'lucide-react';

const PreferencesSettings = () => {
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [apiKey, setApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);

  useEffect(() => {
    getUserApiKey().then(setApiKey);
  }, []);

  const handleRegenerateKey = async () => {
    const newKey = await regenerateUserApiKey();
    setApiKey(newKey);
    showToast({ type: 'success', message: 'API Key regenerated!' });
  };
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey);
    showToast({ type: 'success', message: 'API Key copied to clipboard!' });
  };

  return (
    <div className="space-y-6">
      <Card>
        <div className="p-4 sm:p-6">
          <CardTitle>Theme Preferences</CardTitle>
          <CardDescription>Customize the look and feel of the application.</CardDescription>
        </div>
        <div className="p-4 sm:p-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
            <div className="flex items-center gap-6">
                <Radio id="lightTheme" name="theme" value="light" label="Light" checked={theme === 'light'} onChange={toggleTheme} />
                <Radio id="darkTheme" name="theme" value="dark" label="Dark" checked={theme === 'dark'} onChange={toggleTheme} />
            </div>
        </div>
      </Card>

      <Card>
        <div className="p-4 sm:p-6">
          <CardTitle>API Key</CardTitle>
          <CardDescription>Use this key for API integrations.</CardDescription>
        </div>
        <div className="p-4 sm:p-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
            <Label>Your API Key</Label>
            <div className="relative">
                <Input type={showApiKey ? 'text' : 'password'} value={apiKey} readOnly className="pr-24" />
                <div className="absolute inset-y-0 right-2 flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => setShowApiKey(!showApiKey)} className="p-2 h-auto">
                        {showApiKey ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                    <Button variant="outline" size="sm" onClick={copyToClipboard} className="p-2 h-auto">
                        <Copy size={16}/>
                    </Button>
                </div>
            </div>
            <div className="flex justify-end">
                <Button size="sm" variant="outline" onClick={handleRegenerateKey}>Regenerate Key</Button>
            </div>
        </div>
      </Card>
    </div>
  );
};

export default PreferencesSettings;