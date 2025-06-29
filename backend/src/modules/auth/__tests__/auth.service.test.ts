import { encryptPassword } from '../../../helper/bcrypt';
import { AppError } from '../../../helper/appError';
import { Prisma, Role } from '../../../generated/prisma';
import * as AuthService from '../service';
import * as repo from '../dto/repo';

jest.mock('../dto/repo');

const mockedRepo = repo as jest.Mocked<typeof repo>;

describe('Auth Service', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('returns token when credentials valid', async () => {
      const hashed = await encryptPassword('pass');
      mockedRepo.findOneUser.mockResolvedValue({
        id: '1',
        first_name: 'a',
        last_name: 'b',
        email: 'a@b.com',
        password: hashed,
        role: { name: 'admin' } as unknown as Role,
        business: 'biz',
      } as unknown as Prisma.UserGetPayload<{ include: { role: true } }>);
      mockedRepo.updateAccessToken.mockResolvedValue(
        {} as unknown as Awaited<ReturnType<typeof repo.updateAccessToken>>
      );

      const result = await AuthService.login('a@b.com', 'pass');
      expect(result).toHaveProperty('token');
      expect(mockedRepo.updateAccessToken).toHaveBeenCalled();
    });

    it('throws error when user not found', async () => {
      mockedRepo.findOneUser.mockResolvedValue(null);
      await expect(AuthService.login('a@b.com', 'pass')).rejects.toBeInstanceOf(AppError);
    });
  });

  describe('updateProfile', () => {
    it('updates profile via repo', async () => {
      mockedRepo.updateUser.mockResolvedValue(
        {} as unknown as Awaited<ReturnType<typeof repo.updateUser>>
      );
      mockedRepo.findOneUser.mockResolvedValue({
        id: '1',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        role: {} as unknown as Role,
        business: 'biz',
      } as unknown as Prisma.UserGetPayload<{ include: { role: true } }>);

      const res = await AuthService.updateProfile('1', { first_name: 'John' });

      expect(res).toEqual({
        id: '1',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        role: {},
        business: 'biz',
      });
      expect(mockedRepo.updateUser).toHaveBeenCalledWith('1', { first_name: 'John' });
    });
  });

  describe('changePassword', () => {
    it('changes password when old password matches', async () => {
      const oldHashed = await encryptPassword('old');
      mockedRepo.findOneUser.mockResolvedValue({
        id: '1',
        password: oldHashed,
      } as unknown as Prisma.UserGetPayload<{ include: { role: true } }>);
      mockedRepo.updateUser.mockResolvedValue(
        {} as unknown as Awaited<ReturnType<typeof repo.updateUser>>
      );
      await expect(AuthService.changePassword('1', 'old', 'new')).resolves.toBe(true);
    });

    it('throws error when old password invalid', async () => {
      const oldHashed = await encryptPassword('old');
      mockedRepo.findOneUser.mockResolvedValue({
        id: '1',
        password: oldHashed,
      } as unknown as Prisma.UserGetPayload<{ include: { role: true } }>);
      await expect(AuthService.changePassword('1', 'wrong', 'new')).rejects.toBeInstanceOf(AppError);
    });
  });
});
