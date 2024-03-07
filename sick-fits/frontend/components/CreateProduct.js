import { useState } from 'react';

export default function CreateProduct() {
  const [name, setName] = useState('Wes');
  return (
    <form>
      <label htmlFor="name">
        Name
        <input type="text" id="name" name="name" value={name} />
      </label>
    </form>
  );
}
