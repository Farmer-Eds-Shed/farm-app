import { IonButton, IonItem, IonInput, IonToast } from '@ionic/react';
import { useForm } from 'react-hook-form';
import storageService from '../services/storageService';
import { useState } from 'react';
import { AutocompleteTypes, TextFieldTypes } from '@ionic/core'; // Import AutocompleteTypes and TextFieldTypes


const logout = async (setShowLogoutSuccessToast: (value: boolean) => void) => {
  await storageService.removeItem('refreshToken');
  await storageService.removeItem('accessToken');
  console.log('Logout / clear all tokens');
  setShowLogoutSuccessToast(true);
};

interface FormData {
  username: string;
  password: string;
  url: string;
}

export function LoginForm({ farmUrl }: { farmUrl: string }) {
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showLogoutSuccessToast, setShowLogoutSuccessToast] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    handleSubmit,
    register,
    getValues,
    setValue,
    formState: { errors }
  } = useForm<FormData>({
    defaultValues: {
      username: '',
      password: '',
      url: farmUrl
    }
  });

  const authenticate = async (data: FormData) => {
    const params = new URLSearchParams();

    params.append("grant_type", "password");
    params.append("username", data.username);
    params.append("password", data.password);
    params.append("client_id", "farm");
    params.append("scope", "farm_manager");

    try {
      const response = await fetch(data.url.replace(/\/$/, "") + "/oauth/token", {
        method: "POST",
        cache: 'no-cache',
        body: params,
        headers: {
          "Accept": "application/json",
          "content-type": "application/x-www-form-urlencoded",
        },
      });
      if (!response.ok) {
        throw new Error('Failed to authenticate');
      }
      const receivedData = await response.json();
      await storageService.setItem('refreshToken', receivedData.refresh_token);
      await storageService.setItem('accessToken', receivedData.access_token);
      setShowSuccessToast(true);
    } catch (error: any) {
      console.error(error);
      setShowErrorToast(true);
      setErrorMessage(error.message);
    }
  };

  const onSubmit = async (data: FormData = getValues()) => {
    const sanitizedUrl = data.url.replace(/\/$/, "");
    await storageService.setItem('url', sanitizedUrl);
    setIsLoading(true);
    try {
      await authenticate({ ...data, url: sanitizedUrl });
    } finally {
      setIsLoading(false);
    }
  };

  const renderInput = (name: keyof FormData, type: TextFieldTypes, label: string, autoComplete: AutocompleteTypes) => (
    <IonItem>
      <IonInput
        autocomplete={autoComplete}
        type={type}
        label={label}
        onIonChange={(e: any) => { setValue(name, e.target.value); }}
        {...register(name, {
          required: 'This is a required field',
          pattern: name === 'url' ? {
            value: /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
            message: 'Invalid URL',
          } : undefined,
        })}
      />
      {errors[name] && <span>{errors[name]?.message}</span>}
    </IonItem>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {renderInput('url', 'text', 'URL:', 'url')}
      {renderInput('username', 'text', 'Username:', 'username')}
      {renderInput('password', 'password', 'Password:', 'current-password')}
      <div>
        <IonButton type="submit" disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Login'}
        </IonButton>
        <IonButton onClick={() => { logout(setShowLogoutSuccessToast); }}>Logout</IonButton>
      </div>
      {showErrorToast && (
        <IonToast
          isOpen={showErrorToast}
          message={errorMessage}
          duration={2000}
          color="danger"
          onDidDismiss={() => setShowErrorToast(false)}
        />
      )}
      {showSuccessToast && (
        <IonToast
          isOpen={showSuccessToast}
          message="Login successful!"
          duration={2000}
          color="success"
          onDidDismiss={() => setShowSuccessToast(false)}
        />
      )}
      {showLogoutSuccessToast && (
        <IonToast
          isOpen={showLogoutSuccessToast}
          message="Logout successful!"
          duration={2000}
          color="success"
          onDidDismiss={() => setShowLogoutSuccessToast(false)}
        />
      )}
    </form>
  );
}