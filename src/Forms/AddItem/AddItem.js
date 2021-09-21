import { useState } from 'react'
import { useParams } from 'react-router'
import { v4 as uuidv4 } from 'uuid'
import styled from 'styled-components'

const AddItem = () => {
  const { side, type } = useParams()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [amount, setAmount] = useState(0)

  const changeTitleHandler = event => {
    setTitle(event.target.value)
  }

  const changeDescriptionHandler = event => {
    setDescription(event.target.value)
  }

  const changeAmountHandler = event => {
    setAmount(event.target.value)
  }

  const addItemHandler = () => {
    const addObj = {
      id: uuidv4(),
      side: side,
      type: type,
      title: title,
      description: description,
      amount: Number.parseFloat(amount).toString(),
    }
    const balance = JSON.parse(localStorage.getItem('balance'))
    balance.items.push(addObj)
    localStorage.setItem('balance', JSON.stringify(balance))
  }

  return (
    <Main>
      <ItemFormular>
        <ItemFormularTitle>Add Item</ItemFormularTitle>
        <ItemFormularForm action="/" onSubmit={addItemHandler}>
          <label className="item-formular__label" htmlFor="title">
            Title
          </label>
          <ItemFormularInput
            type="text"
            id="title"
            name="title"
            onChange={changeTitleHandler}
            value={title}
          />
          <label className="item-formular__label" htmlFor="description">
            Description
          </label>
          <textarea
            className="item-formular__input"
            id="description"
            name="description"
            onChange={changeDescriptionHandler}
            rows="4"
            cols="50"
            value={description}
          />
          <label className="item-formular__label" htmlFor="amount">
            Amount
          </label>
          <ItemFormularInput
            type="number"
            id="amount"
            name="amount"
            onChange={changeAmountHandler}
            step="0.01"
            min="0.01"
            value={amount}
          />
          <ItemFormularButton>Add Item</ItemFormularButton>
        </ItemFormularForm>
      </ItemFormular>
    </Main>
  )
}

const Main = styled.main`
  background-color: var(--color-light);
  border: 1px solid var(--color-button-border);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  margin: 1rem auto;
  padding: 0.5rem;
  width: 320px;

  @media screen and (min-width: 760px) {
    flex-direction: row;
    width: 720px;
  }
`

const ItemFormular = styled.section`
  background-color: var(--color-secondary);
  border: 1px solid var(--color-button-border);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0.5rem;
  width: 300px;

  @media screen and (min-width: 760px) {
    width: 700px;
  }
`

const ItemFormularTitle = styled.h2`
  margin: 0.5rem 0.3rem 0.3rem;
  padding: 0;
`

const ItemFormularForm = styled.form`
  background-color: var(--color-primary);
  border: 1px solid var(--color-button-border);
  border-radius: 20px;
  color: var(--color-light);
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 0.5rem;
  width: 280px;

  @media screen and (min-width: 760px) {
    width: 680px;
  }
`

const ItemFormularInput = styled.input`
  font-family: var(--font-family);
  margin-bottom: 0.5rem;
`

const ItemFormularButton = styled.button`
  align-self: center;
  background-color: var(--color-button-green);
  border: 1px solid var(--color-button-border);
  border-radius: 20px;
  color: var(--color-light);
  font-family: var(--font-family);
  padding: 0.3rem 0.5rem;
  width: fit-content;
  transition: all 0.3s ease-in;

  &:hover {
    background-color: var(--color-button-green-hover);
  }
`

export default AddItem