/* eslint-disable */
import { KeystoneContext, SessionStore } from '@keystone-next/types';
import { Session } from '../types';
import { CartItemCreateInput } from '../.keystone/schema-types';

async function addToCart(
  root: any,
  { productId }: { productId: string },
  context: KeystoneContext
): Promise<CartItemCreateInput> {
  console.log('adding to cart');
  // 1. query the current user
  const sesh = context.session as Session;
  if (!sesh.itemId) {
    throw new Error('You must be logged in to do this!');
  }
  // 2. Query the current users cart
  const allCartItems = await context.lists.CartItem.findMany({
    where: { user: { id: sesh.itemId }, product: { id: productId } },
    resolveFields: 'id,quantity'
  });
  const [existingCartItem] = allCartItems;
  if (existingCartItem) {
    console.log(
      `There are already ${existingCartItem.quantity}, is already in the cart, increment by 1!`
    );
    // 3. See if the current item is in their cart
    // 4. if it is increment by 1
    return await context.lists.CartItem.updateOne({
      id: existingCartItem.id,
      data: { quantity: existingCartItem.quantity + 1 },
    });
  }
  // 5. If it isn't create a new cart item
  return await context.lists.CartItem.createOne({
    data: {
        product: {connect: {id:productId}},
        user: {connect:{id:sesh.itemId}}
    }
  })
}

export default addToCart;
