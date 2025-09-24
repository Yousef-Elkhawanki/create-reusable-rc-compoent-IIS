# Shared Table Component

This Repository Contains A **React Table Component** And **Pure Js Web Component** Ready To Use On Any HTML/IIS Page or In React Project.

---

## 1. Avilable Files After Bundling

-   `dist/shared-table.umd.js` -> UMD Version for direct use in HTML/IIS
-   `dist/shared-table.es.js` -> ESM Version for use in React Project
-   `src/SharedTable.jsx` -> Original React Component for direct use in React Component

---

## 2. File In React App Before Build Component
```pgsql

1. Create App , For Example:
   src
 ├─ index.jsx        # (Exports React & Web Component)
 ├─ shared-table.jsx # Web Component
 └─ Table.jsx        # React Reusable Component
```


---

## 3. Setup Build Shared Component

-   1. index.jsx

```js
export { default as Table } from "./Table.jsx"; // React Component
import "./shared-table.jsx"; // Web Component

```

-   2. table.jsx

```js
const Table = () => {
  return (
      <div>Add Your Table Code 😄</div>
  )
}

export default Table
```

-   3. shared-table.jsx

```js
class SharedTable extends HTMLElement {
    connectedCallback(){
        this.innerHTML = `
        <table border="1" style="border-collapse:collapse;width:100%">
          <thead><tr></tr></thead>
          <tbody></tbody>
        </table>
        `;
    }

    set data(value){
        this._data = value;
        this._render();
    }

    _render(){
        const table = this.querySelector("table");
        const thead = this.querySelector("thead");
        const tbody = this.querySelector("tbody");
        thead.innerHTML = "";

        if(this._data?.length){
            Object.keys(this._data[0]).forEach((key)=>{
                const th = document.createElement("th");
                th.textContent = key;
                thead.appendChild(th);
            });
        }

        tbody.innerHTML = "";
        this._data.forEach((row)=>{
            const tr = document.createElement("tr");
            Object.values(row).forEach((val)=>{
                const td = document.createElement("td");
                td.textContent = val;
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });
    }
}

customElements.define("shared-table", SharedTable);

```

-   4. vite.config.js

```js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            entry: "./src/index.jsx",
            name: "SharedTable",
            fileName: (format) => `shared-table.${format}.js`,
            formats: ["umd", "es"],
        },
        rollupOptions: {
            external: ["react", "react-dom"],
        },
        define: {
            "process.env.NODE_ENV": JSON.stringify("production"),
        },
    },
});


```

---

## 4. File On Server
```pgsql
1. Add File On The Server , For Example:
C:\inetpub\wwwroot\table
 ├─ index.html       # صفحة HTML
 ├─ main-app         # مشروع React
 └─ dist
     ├─ shared-table.es.js
     └─ shared-table.umd.js
```
---

## 5. How To Use ?

-   1. In IIS Or HTML [View Source Code](./index.html)
-   2. In React App [View Source Code](./react-app/src/App.jsx)

---
