import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { userService } from './user.service';
import sendResponse from '../../utils/sendResponse';
import { TuserLogin } from './user.interface';

const signup = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createUserDB(req.body);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User registered successfully',
    data: result,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const userLoginData: TuserLogin = req.body;
  const { data, token } = await userService.userLogin(userLoginData);

  res.cookie('Authorization', token);

  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: 'User logged in successfully',
    token: token,
    data: data,
  });
});

export const userController = {
  signup,
  login,
};
