import type { Plugin } from 'grapesjs';

interface AddStorageInter {
    loadFunction: () => any
    storeFunction: (GrapesJsContentJSON : any) => any
}

export const AddStorage: Plugin<AddStorageInter> = (editor, options) => {

    const storageManager = editor.Storage;
    const storeFunction = options.storeFunction
    const loadFunction = options.loadFunction
    let saveTimeout : any; // Para el autoguardado

    storageManager.add('remote', {
        async load() {
          let data = await loadFunction()
          console.log(data)
          return data
        },
      
        async store(data: any) {
            //let almacenado = await storeFunction(data)

            // Establece un nuevo timeout
            console.log('Guardando cambios...');
            await storeFunction(data);
        },
      });
}


/**
 * 
 * // Guardado
            editor.Storage.add('remote', {
                async load() {
                  let data = await loadFunction()
                  console.log(data)
                  return data
                },
              
                async store(data) {
                    //let almacenado = await storeFunction(data)
                    clearTimeout(saveTimeout);

                    // Establece un nuevo timeout
                    saveTimeout = setTimeout(async () => {
                        console.log('Guardando cambios...');
                        await storeFunction(data);
                    }, 6000);
                },
              });
 */