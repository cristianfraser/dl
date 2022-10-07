1. What is the difference between Component and PureComponent? give an example where it might break my app.

A PureComponent is a component that given if its props don't shallowly change (a simple js equal comparison), a re-render won't be triggered. As it was declared a PureComponent, it is expected that if prop or state stays the same, a re-render isn't necessary.

It may cause bugs when props or state did change, but it was an object or something else that requires a more complex comparison than a simple shallow one (===). So the component may think nothing changed when something actually did.

Also, when re-renders trigger some side effect (fetching something), that may be needed to be refetched.

2. Context + ShouldComponentUpdate might be dangerous. Can think of why is that?

Because if shouldComponentUpdate returns false and the component isn't triggered. A context deeper in the tree may not re-render with new values, or deeper components won't get the new updated context values.

3. Describe 3 ways to pass information from a component to its PARENT.

- callback
  passing the child a function that when called sets the value in the parent component

```
const Parent = () => {
    const [value, setValue] = useState('')

    return (
        <Child setValue={setValue} />
    )
}

```

- render props
  Using render props you are able to use child variables in the parent's render method

```
const Parent = () => (
    <Child>
        {({ var1, var2 }) => {
            ...do something
        }}
    </Child>
)

```

- context
  similar to callback, but the callback sets the value in a context that the parent is consuming

```
const Parent = () => {
    const {value} = useContext(context)

    return (
        <Child />
    )
}
const Child = () => {
    const {setValue} = useContext(context)

    () => {
        setValue...
    }

    return (
        <>
        </>
    )
}

```

4. Give 2 ways to prevent components from re-rendering.

useMemo => memoizes the component so that if the props have been used before it returns that
shouldComponentUpdate => implement a check using prevProps and prevState to check if it should re-render

5. What is a fragment and why do we need it? Give an example where it might break my app.

A fragment is a React element that renders its children directly in the DOM. It's useful because React components need to return only one element, and wrapping multiple elements in a Fragment solves that.

6. Give 3 examples of the HOC pattern.

react-router's withRoutes
react-redux's connect(mapState, mapDispatch)
formik's withForm

7. what's the difference in handling exceptions in promises, callbacks and async...await.

Promise and async...await are the same, but different way to write it.

```
promise
    .then()
    .catch(error)


try {
    await promise()
} catch (error) {

}
```

callbacks are just simple functions, and depending on what they do the error handling is different (could be either a catch() or try/catch)

8. How many arguments does setState take and why is it async.

It takes only one argument (either 1. a newState or 2. a function that takes the prevState and returns the newOne)
It's async because React batches many state changes together and then "flushes" it later, so changes with setState aren't synchronous to keep the ui flowing.

9. List the steps needed to migrate a Class to Function Component.

- Move the lyfecycle methods into useEffect blocks
- Move state into hooks
- fix any errors

10. List a few ways styles can be used with components.

- styled-components
- plain css
- css modules

11. How to render an HTML string coming from the server.

using the `dangerouslySetInnerHtml` property of a div. Input should be properly sanitized before rendering it.
