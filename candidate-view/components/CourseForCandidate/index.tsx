
interface Props {
}

const products = [
  {
    id: 1,
    name: 'JS course',
    href: '#',
    color: 'From Youtube',
    price: 'FREE',
    quantity: "Basic",
    imageSrc: 'https://i.ytimg.com/vi/pN6jk0uUrD8/hqdefault.jpg?sqp=-oaymwEcCNACELwBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBEKFeZJ9rNZqMkNlDZmB9yweaHEg',
  },
  {
    id: 2,
    name: 'JS basic',
    href: '#',
    color: 'Learn Website',
    price: '$70 / month',
    quantity: "Advanced",
    imageSrc: 'https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  },
]


const CourseForCandidate : React.FC<Props> = ({}) => {
    return (
      <div className="flex flex-col">
      <div className="pointer-events-auto w-screen max-w-md">
                <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                    <div className="mt-8">
                      <div className="flow-root">
                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                          {products.map((product) => (
                            <li key={product.id} className="flex py-6">
                              <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                <img
                                  src={product.imageSrc}
                                  alt={product.imageAlt}
                                  className="h-full w-full object-cover object-center"
                                />
                              </div>

                              <div className="ml-4 flex flex-1 flex-col">
                                <div >
                                  <div className="flex justify-between text-base font-medium text-gray-900">
                                    <h3>
                                      <a href={product.href}> {product.name} </a>
                                    </h3>
                                    <p className="ml-4">{product.price}</p>
                                  </div>
                                  <p className="text-left mt-1 text-sm text-gray-500">{product.color}</p>
                                </div>
                                <div className="flex flex-1 items-end justify-between text-sm">
                                  <p className="text-gray-500">Level {product.quantity}</p>

                                  <div className="flex">
                                    <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
                                      Buy the course
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
    </div>
    );
}

export default CourseForCandidate;
