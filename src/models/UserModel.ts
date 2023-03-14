import { AppDataSource } from '../dataSource';
import { User } from '../entities/User';

const userRepository = AppDataSource.getRepository(User);

async function getUserById(userId: string): Promise<User | null> {
  const user = await userRepository.findOne({ where: { userId }, relations: ['links'] });
  return user;
}

async function getUserByUsername(username: string): Promise<User | null> {
  const user = await userRepository.findOne({ where: { username }, relations: ['links'] });
  return user;
}

async function addNewUser(username: string, passwordHash: string): Promise<User | null> {
  // Create the new user object
  let newUser = new User();
  newUser.username = username;
  newUser.passwordHash = passwordHash;

  newUser = await userRepository.save(newUser);

  return newUser;
}

// async function getUserByEmail(email: string): Promise<User | null> {
//   return await userRepository.findOne({ where: { email } });
// }
// async function allUserData(): Promise<User[]> {
//   return await userRepository.find();
// }

// async function getUserById(userId: string): Promise<User | null> {
//   const user = await userRepository.findOne({ where: { userId } });
//   return user;
// }

// async function getUsersByViews(minViews: number): Promise<User[]> {
//   const users = await userRepository
//     .createQueryBuilder('user')
//     .where('profileViews >= :minViews', { minViews }) // NOTES: the parameter `:minViews` must match the key name `minViews`
//     .select(['user.email', 'user.profileViews', 'user.joinedOn', 'user.userId'])
//     .getMany();

//   return users;
// }

// async function incrementProfileViews(userData: User): Promise<User> {
//   const updatedUser = userData;
//   updatedUser.profileViews += 1;

//   await userRepository
//     .createQueryBuilder()
//     .update(User)
//     .set({ profileViews: updatedUser.profileViews })
//     .where({ userId: updatedUser.userId })
//     .execute();

//   return updatedUser;
// }

// async function resetAllProfileViews(): Promise<void> {
//   await userRepository
//     .createQueryBuilder()
//     .update(User)
//     .set({ profileViews: 0 })
//     .where('verifiedEmail <> true')
//     .execute();
// }

// async function updateEmailAddress(userId: string, newEmail: string): Promise<void> {
//   await userRepository
//     .createQueryBuilder()
//     .update(User)
//     .set({ email: newEmail })
//     .where({ userId })
//     .execute();
// }

export { getUserByUsername, addNewUser, getUserById };
