export const handleKeyDownForNumericInputs = (e) => {
    // Prevenir la entrada del signo negativo, positivo y "e" mediante el teclado
    const MINUS_KEYCODE = 189
    const PLUS_KEYCODE = 187
    const EULER_KEYCODE = 69
    if (e.keyCode === MINUS_KEYCODE || e.keyCode === PLUS_KEYCODE || e.keyCode == EULER_KEYCODE) {
        e.preventDefault();
    }
};

export const handleValueForNumericInputs = (e, setValue, value) => {
    const eventValue = Number(e.target.value)
    if(isNaN(eventValue)) return
    if(eventValue < 0) return
    if(value == 0) setValue(undefined)
    setValue(eventValue)
  }