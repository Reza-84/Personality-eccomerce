import Card from "./Card";

export default function ProductCards() {
  var cards = [
    
        {
            id: 1,
            off: "32% off",
            image: "/images/popular/pic1.png", // چون در Card از item.image استفاده می‌شه
            title: "T-shirt 1",                 // در Card از item.title استفاده می‌شه
            describe: "Men Black Grey Allover Printed Round Neck ...",
            price: "30.15$",
            offerprice: "25.15",
          },
    {
      id: 2,
      off: "32% off",
      image: "/images/popular/pic2.png",
      name: "T-shirt 2",
      describe: "Men Black Grey Allover Printed Round Neck ...",
      price: "30.15$",
      offerprice: "25.15",
    },
    {
      id: 3,
      off: "32% off",
      image: "/images/popular/pic3.png",
      name: "T-shirt 3",
      describe: "Men Black Grey Allover Printed Round Neck ...",
      price: "30.15$",
      offerprice: "25.15",
    },
    {
      id: 4,
      off: "32% off",
      image: "/images/popular/pic4.png",
      name: "T-shirt 4",
      describe: "Men Black Grey Allover Printed Round Neck ...",
      price: "30.15$",
      offerprice: "25.15",
    },
    {
      id: 5,
      off: "32% off",
      image: "/images/popular/pic1.png",
      name: "T-shirt 5",
      describe: "Men Black Grey Allover Printed Round Neck ...",
      price: "30.15$",
      offerprice: "25.15",
    }
  ];

  return (
    <>
      <div className="container">
        <div className="row g-3">
          {cards.map((product) => (
            <Card key={product.id} item={product} />

          ))}
        </div>
      </div>
    </>
  );
}
