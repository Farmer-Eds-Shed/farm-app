import { IonButton, IonItem, IonInput } from '@ionic/react';
import { useForm } from 'react-hook-form';
import { Storage } from '@ionic/storage';

const store = new Storage();
store.create();

const logout = async () => {
  await store.set('refreshToken', "");
  await store.set('accessToken', "");
  console.log('Logout / clear all tokens');
};

interface FormData {
  username: string;
  password: string;
  url: string;
}

export function LoginForm({ farmUrl }: { farmUrl: string }) {
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

  // farmOS Auth0 token request
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
      const receivedData = await response.json();
      await store.set('refreshToken', receivedData.refresh_token);
      await store.set('accessToken', receivedData.access_token);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = (data: FormData = getValues()) => {
    const sanitizedUrl = data.url.replace(/\/$/, "");
    store.set('url', sanitizedUrl);
    authenticate({ ...data, url: sanitizedUrl });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <IonItem>
        <IonInput
          autocomplete="url"
          label="url:"
          onIonChange={(e: any) => { setValue('url', e.target.value.replace(/\/$/, "")); }}
          {...register('url', {
            required: 'This is a required field',
          })}
        />
        {errors.url && <span>{errors.url.message}</span>}
      </IonItem>
      <IonItem>
        <IonInput
          autocomplete="username"
          label='Username:'
          onIonChange={(e: any) => { setValue('username', e.target.value); }}
          {...register('username', {
            required: 'This is a required field',
          })}
        />
        {errors.username && <span>{errors.username.message}</span>}
      </IonItem>
      <IonItem>
        <IonInput
          autocomplete="current-password"
          type='password'
          label='Password:'
          onIonChange={(e: any) => { setValue('password', e.target.value); }}
          {...register('password', {
            required: 'This is a required field',
          })}
        />
        {errors.password && <span>{errors.password.message}</span>}
      </IonItem>
      <div>
        <IonButton type="submit">Login</IonButton>
        <IonButton onClick={() => { logout(); }}>Logout</IonButton>
      </div>
    </form>
  );
}