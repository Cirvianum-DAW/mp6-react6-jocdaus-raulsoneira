# :game_die: Joc de Daus

## Objectiu

Amb aquest repte mirarem d'abordar un petit repte nosaltres mateixos a través d'un joc de daus, a veure si hem assolit els primer aprenentatges de React.

**El joc consisteix a generar un nombre `N` de daus i establir una possible suma guanyadora. Si la suma de la tirada de tots els daus és igual a la suma que hem pronosticada, guanyem. Si no, perdem.**

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

Quan programem en general i en especial amb React, la modularitat és molt important. Hem de pensar en components petits i reutilitzables. Això ens fa més fàcil de mantenir i d'entendre què fa cada component.

Hi ha diferents maneres de "teoritzar" sobre això, però en general ens plantegem 3 tipus de components:

- **Presentació**: Són components que només es preocupen de com es mostra la informació. No tenen estat. Normalment reben la informació a través de props i s'encarreguen de mostrar-la. No especifiquen com s'han de carregar o manipular les dades i no fan mutar un estat. És a dir, normalment son "stateless". 

- **Lògica o Contenidors**: Són components que es preocupen de l'estat i/o la lògica de l'aplicació. Són els encarregats de proveir amb la informació i el comportament als components de presentació. Criden a accions i/o serveis que ofereixen com a "callbacks" als components de presentació. 

- **Presentació i lògica**: Són components que requereixen de presentació i lògica. Són els més difícils de programar i els més difícils de mantenir.

Sabent això, reflexiona quins components creus que podríem necessitar en aquest joc?

Recorda que el joc ha de poder generar tants daus com considerem (`N` daus) i apartir d'aqui necessitarem un component que ens generi un dau. Aquest dau, tindrà un valor aleatori entre 1 i 6.

D'entrada aquesta podria ser una proposta:

- **App**: Component principal que fa de contenidor de l'aplicació global.
- **LuckyN**: Component per implementar tota la lògica del joc.
- **Dice**: Component intermig encarregat de mostrar el nombre 'N' de daus.
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

Així doncs anem a intentar definir en una taula quins serà el propòsit de cada component i quins seran els seus props.

| Component | Propòsit    |
| --------- | ----------- |
| App       | Presentació |
| LuckyN    | Lògica      |
| Dice      | Presentació |
| Dau       | Presentació |

## Implementació

A partir d'ara farem la implementació guiada però sense donar-vos el codi directament. Som-hi!

> **Nota** A VSCode podràs generar de manera ràpida l'estructura inicial d'un component de React gràcies al plguin que vam instal·lar amb Snippets. Només cal que escriguis `rfc` i premis `TAB`. Hi ha algunes variants més com `rafce` o `rcc` en funció del tipus de component que vulguis generar.

### Component App

Genera el component `App`. Prova a utilitzar una d'aquestes draceres per generar-lo en forma de component amb arrow function i export (`rafce`). De moment no cal fer res més. Ens servirà per provar alguns components inicialment.

### Component Dau

Aquest component només haurà d'assegurar-se de mostrar el valor del dau. Aquest valor li arribarà a través d'un prop.

Senzill, res més de moment. Assegura't de que tingui l'estructura necessària. De moment pots obviar els estils.

Anem a aprofitar per veure que podem aplicar els nostres estils the TailwindCSS a través d'un arxiu CSS. Genera un arxiu `Dau.css` i aquí et dono algues idees amb TailwindCSS que et poden anar bé:

```css
.Dau {
  @apply inline-block flex h-16 w-16 items-center justify-center rounded-full text-4xl font-bold text-white;
}

.Dau--1 {
  @apply bg-red-500;
}

.Dau--2 {
  @apply bg-blue-500;
}

.Dau--3 {
  @apply bg-green-500;
}

.Dau--4 {
  @apply bg-yellow-500;
}

.Dau--5 {
  @apply bg-purple-500;
}

.Dau--6 {
  @apply bg-pink-500;
}
```

La idea és que puguis veure colors diferents per cada número que pugui sortir.

Afegeix-lo puntualment al teu `App` per veure si funciona i es visualitza correctament.

### Component Dice

Aquest component esperarà rebre un array de números corresponent amb la jugada dels daus que s'han tirat i per cada número generarà un component `Dau` amb el valor corresponent. Cap estat ni cap esdeveniment.

> **Important** Recorda que quan generem un array de components, React necessita que cada component tingui un `key` únic. En aquest cas, hauràs de contemplar ja que l'array que reps ha de tenir un `key` únic per cada component `Dau` que generis. En casos reals no utilitzaríem l'index de l'array perquè no és un valor únic. En aquest cas, per no complicar-ho massa, ho pots fer així.

Si vols deixa que Copilot faci la magia i generi alguns estils per tu en aquest cas. De moment hauries de poder mostrar quelcom semblant a axiò:

![Daus Inici](./assets/img_readme/daus_inici.webp)

En aquest punt hauries de veure que si per exemple volguessim implementar diferents jocs en paral·lel, ho podríem fer fàcilment fent servir aquest component `Dice` que ens hem generat i que on ara crea una sola fila de daus, podríem crear tantes com necessitéssim. O per exemple imagina que volem aplicar un estil concret i passar-lo també com a prop perquè tots els daus és generin amb aquest estil (un color concret per exemple). Això és modularitat.

### Component LuckyN

Aquest és el component clau a nivell de lògica. Recorda que la idea seria que en aquest document, donat **un número `n` de Daus i una suma guanyadora**, sigui capaç de mostrar diferents opcions Això t'hauria de donar una idea de quin tipus de variables i/o props que necessitarem en aquest component.

Pots fer-te un arxiu `utils.js` on tenir les teves eines. En aquest cas com ho faries si:

- Els nostres daus tenen 6 cares (1 a 6)
- Necessitem una funció que simuli un tir de dau.
- Necessitem simular també diversos intents o tirades amb els possibles resultats del dau.
- Estaria bé un botó que ens permetès anar tirant els daus fins que guanyéssim.

> **Important** Pensa que el teu component es renderitzarà cada vegada que canviï l'estat de les teves variables del useState. És a dir, quan modifiquem una variable d'estat de les definides amb useState (a través del "set..." normalment), si aquesta canvia, el component tornarà a renderitzar-se. Ara bé, el valor de l'estat no canvia fins que el component es torna a renderitzar! Això ho haurem de tenir sempre molt present!!!

Pots aprofitar aquest funcionament del useState i els components per fer que en cada tir de dau sigui el responsable d'un nou renderitzat del component. Això és el que anomenem **re-render**.

A continuació tens un exemple final amb dos component LuckyN i diferents combinacions de daus i sumes guanyadores:

![Daus Final](./assets/img_readme/daus_final.gif)

## Bonus

Pots intentar modificar el codi i que enlloc de mostrar-se números es mostrin els daus, fer que es vegin com si es tractès realment d'un
