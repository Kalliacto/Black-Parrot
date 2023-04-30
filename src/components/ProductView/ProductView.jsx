// import React, { useContext } from 'react';
// import './productView.css';
// import GoBack from '../GoBack/GoBack';
// import { ReactComponent as Like } from '../Card/img/Like.svg';
// import { CardContext } from '../../context/cardContext';

// const ProductView = ({ productInfo }) => {
//     const { user, changeLikeCard } = useContext(CardContext);

//     // const foo = async (productInfo, user) => {
//     //     const cardLiked = await productInfo.likes.some(
//     //         (item) => item === user._id
//     //     );
//     //     changeLikeCard(productInfo._id, cardLiked);
//     // };

//     return (
//         <>
//             <div className="product__wrapper">
//                 <div className="product__title_wrapper">
//                     <GoBack />
//                     <h3 className="product__title">{productInfo.name}</h3>
//                     <div className="product__rating">
//                         <span>Artikul</span>
//                         <span>Rate</span>
//                     </div>
//                 </div>
//                 <div className="product__img_wrapper">
//                     <div className="card__sticky card__sticky_left">
//                         {productInfo.discount ? (
//                             <span className="card__discount">
//                                 -{productInfo.discount}%
//                             </span>
//                         ) : (
//                             ''
//                         )}
//                     </div>
//                     <div className="card__sticky card__sticky_right">
//                         <button
//                             // onClick={() => foo(productInfo, user)}
//                             className={`btn__like ${
//                                 productInfo.likes
//                                     ? 'card__like_active'
//                                     : 'card__like'
//                             }`}
//                         >
//                             <Like />
//                         </button>
//                     </div>
//                     <img
//                         className="product__img"
//                         src={productInfo.pictures}
//                         alt=""
//                     />
//                 </div>
//                 <div className="product__description">
//                     <span className="product__description_price">
//                         {productInfo.price}&nbsp;₽
//                     </span>
//                 </div>
//                 <div className="product__description">
//                     <span className="product__description_title">Описание</span>
//                     <span>{productInfo.description}</span>
//                 </div>
//             </div>
//         </>
//     );
// };

// export default ProductView;
