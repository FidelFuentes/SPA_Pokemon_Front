import React, {useState,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux'; 
import styles from './Form.module.css'
import { createPokemon } from '../../redux/actions';



const Form = () => {
    const dispatch = useDispatch();
    const pokemonCreationStatus = useSelector(state => state.pokemonCreationStatus);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const errorMessage = useSelector(state => state.errorMessage);
    const [form , setForm] = useState({
        name:'',
        life:'',
        attack:'',
        defense:'',
        speed:'',
        height:'',
        weight:'',
        image: null,
        imageSize: {width: 0, height: 0},
        types: [],
    });

    const [errors, setErrors] = useState({
        name:'',
        life:'',
        attack:'',
        defense:'',
        speed:'',
        height:'',
        weight:'',
        image: '',
        types: '',
    });

    useEffect(() => {
        if (pokemonCreationStatus === 'failure') {
          setShowError(true);
        }
      }, [pokemonCreationStatus]);

    useEffect(() => {
        if (showError) {
            const timer = setTimeout(() => {
                setShowError(false);
            }, 3000);
            
            // Limpiar el temporizador si el componente se desmonta
            return () => clearTimeout(timer);
        }
    }, [showError]);
    
      

    const changeHandler = (event) => {
        const property = event.target.name;
        let value = event.target.value;
    
        if (event.target.name === "types") {
            value = value.split(', ').filter(type => type !== '').map(type => type.trim());

        }
        
        
    
        let formWithoutProperty = { ...form };
        delete formWithoutProperty[property];
        validate({ ...formWithoutProperty, [property]: value });
        setForm({ ...form, [property]: value });
    };
    
    const validate = (form) => {
        let errors = {
            name: !form.name ? 'The name cannot be empty' : 
                  !/^[a-zA-Z]*$/.test(form.name) ? 'The name can only contain letters' : '', 
            life: !form.life ? 'The Pokémon\'s life cannot be empty' : 
                  isNaN(form.life) ? 'The Pokémon\'s life must be a number' :
                  form.life < 0 ? 'The Pokémon\'s life cannot be negative' : 
                  form.life > 1000 ? 'The Pokémon\'s life cannot exceed 1000 points' : '',
            attack: !form.attack ? 'The Pokémon\'s attack cannot be empty' : 
                    isNaN(form.attack) ? 'The Pokémon\'s attack must be a number' :
                    form.attack < 0 ? 'The Pokémon\'s attack cannot be negative' :
                    form.attack > 1000 ? 'The Pokémon\'s attack cannot exceed 1000 points' : '',
            defense: !form.defense ? 'The Pokémon\'s defense cannot be empty' : 
                     isNaN(form.defense) ? 'The Pokémon\'s defense must be a number' :
                     form.defense < 0 ? 'The Pokémon\'s defense cannot be negative' : 
                     form.defense > 1000 ? 'The Pokémon\'s defense cannot exceed 1000 points' : '',
            speed: isNaN(form.speed) ? 'The Pokémon\'s speed must be a number' : 
                   form.speed < 0 ? 'The Pokémon\'s speed cannot be negative' : 
                   form.speed > 1000 ? 'The Pokémon\'s speed cannot exceed 1000 points' : '',
            height: isNaN(form.height) ? 'The Pokémon\'s height must be a number' : 
                    form.height < 0 ? 'The Pokémon\'s height cannot be negative' : 
                    form.height > 1000 ? 'The Pokémon\'s height cannot exceed 1000 points' : '',
            weight: isNaN(form.weight) ? 'The Pokémon\'s weight must be a number' : 
                    form.weight < 0 ? 'The Pokémon\'s weight cannot be negative' : 
                    form.weight > 1000 ? 'The Pokémon\'s weight cannot exceed 1000 points' : '',
            image: form.imageSize.width > 260 || form.imageSize.height > 260 ? 'Image size should not exceed 260x260' : '',
            types: !form.types ? 'Pokémon types cannot be empty' : 
                   form.types.some(type => /\d/.test(type)) ? 'Pokémon types cannot contain numbers' : '',
        };
        setErrors(errors);
    }
    
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            let img = new Image();
            img.src = url;
            img.onload = () => {
                setForm({ 
                    ...form, 
                    image: file, 
                    imageSize: {width: img.width, height: img.height}
                });
            };
        }
    };
    
      

      const submitHandler = (event) => {
        event.preventDefault();
      
        // No envíes el formulario si hay errores
        const errorValues = Object.values(errors);
        for (let i = 0; i < errorValues.length; i++) {
          if (errorValues[i]) return;
        }
      
        // Creamos un objeto FormData y añadimos todos los valores del formulario
        const formData = new FormData();
        for (const key in form) {
          formData.append(key, form[key]);
        }
          // Log formData para debugging
    // Para loggear los pares clave/valor que hay en el formData
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
      
        dispatch(createPokemon(formData));
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);

      };
      
      

    return (
        
        
       
        <form onSubmit={submitHandler} className={styles.container}>
            
            <div>
                <label>Name</label>
                <input type="text" 
                value={form.name}
                onChange={changeHandler}
                name="name"
                />
                {errors.name && <span>{errors.name}</span>}
            </div>
            <div>
                <label>Life</label>
                <input type='number' 
                value={form.life}
                onChange={changeHandler}
                name="life"
                />
                {errors.life && <span>{errors.life}</span>}
            </div>
            <div>
                <label>Attack</label>
                <input type='number'  
                value={form.attack}
                onChange={changeHandler}
                name="attack"
                />
                {errors.attack && <span>{errors.attack}</span>}
            </div>
            <div>
                <label>Defense</label>
                <input type='number'  
                value={form.defense}
                onChange={changeHandler}
                name="defense"
                />
                {errors.defense && <span>{errors.defense}</span>}
            </div>
            <div>
                <label>Speed</label>
                <input type='number'  
                value={form.speed}
                onChange={changeHandler}
                name="speed"
                />
                {errors.speed && <span>{errors.speed}</span>}
            </div>
            <div>
                <label>Height</label>
                <input type='number'  
                value={form.height}
                onChange={changeHandler}
                name="height"
                />
                {errors.height && <span>{errors.height}</span>}
            </div>
            <div>
                <label>Weight</label>
                <input type='number'  
                value={form.weight}
                onChange={changeHandler}
                name="weight"
                />
                {errors.weight && <span>{errors.weight}</span>}
            </div>
            <div>
                 <label>Image</label>
                 <input
                  type="file"
                 onChange={handleImageChange}
                  name="image"
                  accept="image/*"
                 />
                 {errors.image && <span>{errors.image}</span>}
            </div>
            <div>
                <label>Types</label>
                <input type="text" 
                // convertimos de nuevo a una cadena para mostrarla
                value={form.types.join(', ')} 
                onChange={changeHandler}
                name="types"
                placeholder="Separate types with commas"
                />
                {errors.types && <span>{errors.types}</span>}
            </div>
            <button type="submit" disabled={Object.values(errors).some((error) => error !== '')}>Submit</button>
            {showSuccess && pokemonCreationStatus === 'success' && <p>Pokémon created successfully!</p>}
            {errorMessage && <p>{errorMessage.error}</p>}
        </form>
    );
}

export default Form;