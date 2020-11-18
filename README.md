## react-custom-calender

Custom calender with highlight selected date

<!-- ## Demo

See the working [Demo](https://kbct5.csb.app/) -->

## Installation

```
yarn add react-custom-calender

```

## Usage

```
<Calender />
```

## Props Type

```
fromDate: PropTypes.instanceOf(Date),
toDate: PropTypes.instanceOf(Date),
monthsToDisplay: PropTypes.number,
color: PropTypes.object,
onNextIcon: PropTypes.element,
onPrevIcon: PropTypes.element,

```

## Default props

```
fromDate: new Date(),
toDate: new Date(),
monthsToDisplay: 3,
color: {
  today: "gray",
  selected: "white",
  selectedBG: "lightgreen",
  date: "06041d",
  backgroundColor: "transparent",
},
onNextIcon: <></>,
onPrevIcon: <></>,

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
