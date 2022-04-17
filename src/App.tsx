
import { useState } from "react"
import styles from "./App.module.css"
import powerImage from "./assets/powered.png"
import { GridItem } from "./components/GridItem"
import leftArroImage from "./assets/leftarrow.png"

import { levels, calculateImc, Level } from "./helpers/imc"


const App = () => {

  const [heightField, setHeightField] = useState<number>(0);
  const [weightField, setWeightField] = useState<number>(0);
  const [toShow, setToShow] = useState<Level | null>(null);


  const handleCalculateButton = () => {
    if (heightField && weightField) {
      setToShow(calculateImc(heightField, weightField))

    } else {
      alert("Digite todos os campos.")
    }
  }

  const handleBackButton = () => {
    setToShow(null);
    setHeightField(0);
    setWeightField(0);
  }



  return (

    <div className={styles.main}>
      <header>
        <div className={styles.headerContainer}>
          <img src={powerImage} alt="" width={150} />
        </div>
      </header >

      <div className={styles.Container}>
        <div className={styles.leftSide}>
          <h1>Calcule o seu IMC.</h1>
          <p>IMC é a sigla para indice de massa corporea.</p>

          <input
            type="number"
            placeholder="Digite a sua altura. EX: 1.5"
            value={heightField > 0 ? heightField : ""}
            onChange={e => setHeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false} />

          <input
            type="number"
            placeholder="Digite o seu peso. EX: 75"
            value={weightField > 0 ? weightField : ""}
            onChange={e => setWeightField(parseFloat(e.target.value))}
            disabled={toShow ? true : false} />

          <button onClick={handleCalculateButton}
            disabled={toShow ? true : false}>Calcular</button>

        </div>
        <br />

        <div className={styles.rightSide}>
          {!toShow &&
            <div className={styles.grid}>
              {levels.map((item, key) => (
                <GridItem key={key} item={item} ></GridItem>
              ))}
            </div>
          }

          {toShow &&
            <div className={styles.rightBig}>
              <div className={styles.rightArrow} onClick={handleBackButton}>
                <img src={leftArroImage} alt="" width={25} />
              </div>
              <GridItem item={toShow} />
            </div>

          }

        </div>
      </div>
    </div >
  );
}

export default App


