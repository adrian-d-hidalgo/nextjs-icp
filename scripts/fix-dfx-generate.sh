#!/bin/bash

# Recibe el folder a buscar
folder="./src/declarations"

# Itera por todos los archivos en el folder
for path in $(find $folder -type d); do

  # Itera por todos los archivos en el subfolder
  for file in $(find "$path" -type f -maxdepth 1); do

    # Si el archivo es un index.js
    if [[ "$file" == *"index.js" ]]; then

      # Muestra el nombre del subfolder
      subfolder=$(basename $path | sed 's|^.*/||')
      uppercase_subfolder=$(echo "$subfolder" | tr '[:lower:]' '[:upper:]')
      env_canister_id=$(echo "CANISTER_ID_""$uppercase_subfolder")
      next_env_canister_id=$(echo "NEXT_PUBLIC_""$uppercase_subfolder""_CANISTER_ID")

      # Abre el archivo en modo lectura
      f=$(mktemp)
      cat "$file" > "$f"

      # Busca el texto igual al valor almacenado en $env_canister_id
      sed "s|$env_canister_id|$next_env_canister_id|g" "$f" > "$file"

      # Cierra el archivo
      rm "$f"

    fi
  done
done