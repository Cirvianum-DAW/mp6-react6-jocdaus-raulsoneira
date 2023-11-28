# Joc Daus

## Objectiu

Amb aquest repte mirarem d'abordar un petit repte nosaltres mateixos a través d'un joc de daus, a veure si hem assolit els primer aprenentatges de React. 

**El joc consisteix a generar un nombre `N` de daus i establir una possible suma guanyadora. Si la suma dels daus és igual a la suma guanyadora, guanyem. Si no, perdem.**

Això, ens permetrà practicar els conceptes ja vistos de React però sobretot, entendre l'estratègia i el rol de cada component. 

## Requisits

- Tornem a tenir el mateix entorn que fins ara amb Vite, React i TailwindCSS. 
- He afegit quelcom que et pot anar bé a la configuració del linter perquè no doni error els props de React. Als `rules` hem afegit la línia `react/jsx-uses-react: off`.
  
  ```json
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    `react/jsx-uses-react`: `off`,
  },
  ```

## Estructura del nostre projecte

Abans de començar a programar, anem a pensar quins components necessitem, quins seran els seus props i quina serà la seva funció (presentació o lògica). 

Quan programem en general i en especial amb React, la modularitat és molt important. Hem de mirar de tenir components petits i reutilitzables. És més fàcil de mantenir i d'entendre què fa cada component.

I en general ens plantegem 3 tipus de components:

- **Presentació**: Són components que només es preocupen de mostrar informació. No tenen estat. Tracten amb l'aparença/UI.

- **Lògica**: Són components que només es preocupen de l'estat i/o la lògica de l'aplicació. No tracten la presentació de manera específica. 

- **Presentació i lògica**: Són components que tenen presentació i lògica. Són els més difícils de programar i els més difícils de mantenir.

Sabent això, quins components creus que podríem necessitar en aquest joc? 

Recorda que el joc ha de poder generar tants daus com considerem (`N` daus) i apartir d'aqui necessitarem un component que ens generi un dau. Aquest dau, tindrà un valor aleatori entre 1 i 6.

D'entrada que et sembla si pensem en una estructura com aquesta:

- **App**: Component principal que fa de contenidor de l'aplicació global.
- **LuckyN**: Component per implementar la lògica del joc. 
- **Dice**: Component intermig "tonto" necessari per tenir una proposta més versàtil.
- **Dau**: Component que ens permeti mostrar un dau amb un valor aleatori entre 1 i 6.

A continuació t'ho mostro de manerara jeraquitzada amb un exemple de tres daus:

```bash
App
└── LuckyN
    ├── Dice
       └── Dau
       └── Dau
       └── Dau

```

Algunes consideracions: 

- D'entrada segurament hagis pensat que el component `Dau` ha de tenir l'estat responsable de generar els resultats de cada tirada. Ara bé, això és un problema perquè si el component `Dau` té l'estat, per defecte no podrem enviar aquest valor als components pare (`Dice` i `LuckyN`). Ho podríem fer en tot cas a través d'una variable i/o funció de prop passada prèviament des dels pares... però realment és necessari?
- Pregunteu-vos fins a on hauria d'arribar aquesta informació. No hauries "d'elevar" la informació més enllà d'on és necessària. 
- El component `Dice` està pensat per evitar, per exemple, que si en algun moment volguéssim habilitar la possibilitat de tenir més d'un jugador, no haguéssim de modificar la resta de components. 

## Implementació

A partir d'ara farem la implementació guiada però sense donar-vos el codi directament. Som-hi!

### Component Dau




