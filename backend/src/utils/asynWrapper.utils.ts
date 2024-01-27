import { NextFunction, Request, Response } from "express";

// Method 1 -
// export const asyncWrapper =
// 	(
// 		requestHandler: (
// 			req: Request,
// 			res: Response,
// 			next: NextFunction
// 		) => Promise<Response | void | Error>
// 	) =>
// 	async (req: Request, res: Response, next: NextFunction) => {
// 		try {
// 			await requestHandler(req, res, next);
// 		} catch (error) {
// 			next(error);
// 		}
// 	};

// Method 2 -
export const asyncWrapper =
	(
		requestHandler: (
			req: Request,
			res: Response,
			next: NextFunction
		) => Promise<Response | void | Error>
	) =>
	(req: Request, res: Response, next: NextFunction) => {
		Promise.resolve(requestHandler(req, res, next)).catch((error) =>
			next(error)
		);
	};
