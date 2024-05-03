// This is the part of the process in which the token is being signed mainly. It is not related to authorization of the user and so on. it is created first (before jwt.strategy,jwt.guards.ts or jwt-auth.guard.ts) just to provide the user with the Token nothing more
import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";


@Injectable()
class CustomJWTService extends JwtService{
    private readonly jwtConfig: any;
    private readonly envProcess:any;
    constructor (
        @Inject(ConfigService ) private readonly configService:ConfigService<ENVConfigType>
        )
        {
            super();
            this.envProcess = process.env;
        }
    
    public async generateToken({secret,expireTime,payload,jwtIssuer} : GenerateTokenPropsType){

        const token = await this.signAsync(
            payload,
            {   
                secret,
                issuer:jwtIssuer ?? this.envProcess.JWT_ISSUER ,
                expiresIn: expireTime
            }
        );

        return token;
    }

    public async generateAccessToken(user) {

        const {phoneNumber, ...rest} = user ;

        const token = await this.generateToken({
            secret : this.envProcess.JWT_ACCESS_TOKEN_SECRET,
            expireTime :3600,
            payload : rest,
        });

        return token;
    }
    
    public async generateRefreshToken(user) {
        const {phoneNumber, ...rest} = user ;

        const token = await this.generateToken({
            secret : this.envProcess.JWT_REFRESH_TOKEN_SECRET,
            expireTime :"7d",
            payload : rest,
        });
        return token;
    }

    public async verifyToken<jwtPayloadType>({ token, secret, jwtIssuer }: VerifyTokenPropsType) {
        
        const jwtSecret = secret;
        const jwtissuer = jwtIssuer ?? this.envProcess.JWT_ISSUER;
        const returnObj = { isValid: false, data: null } as { isValid: boolean, data: jwtPayloadType };

        const tokenPayload = await this.verifyAsync(token,{secret:jwtSecret,issuer: jwtissuer});

            if (tokenPayload) {
                returnObj.isValid = true;
                returnObj.data = tokenPayload;
    
            } else {
                returnObj.isValid = false;
                returnObj.data = null;
            }
    
            return returnObj;
    }

    public async verifyRefreshToken({token}){
        const tokenData = await this.verifyToken({
            token,
            secret:this.envProcess.JWT_REFRESH_TOKEN_SECRET,
            jwtIssuer:this.envProcess.JWT_ISSUER
        })

        if(!tokenData.isValid){
            throw new UnauthorizedException('Refresh Token Data is  Invalid');
        }

        return tokenData;
    }

    public async verifyAccessToken({token}){
        const tokenData = await this.verifyToken({
            token,
            secret:this.envProcess.JWT_ACCESS_TOKEN_SECRET,
            jwtIssuer:this.envProcess.JWT_ISSUER
        })

        if(!tokenData.isValid){
            throw new UnauthorizedException('Access Token Data is  Invalid');
        }

        return tokenData.data;
    }
}

export default CustomJWTService;

interface GenerateTokenPropsType {
    secret?: string,
    jwtIssuer?:string,
    expireTime:number | string;
    payload:any
}

interface VerifyTokenPropsType{
    token:string;
    secret?:string;
    jwtIssuer?:string;     
}


interface ENVConfigType{
    jwt:ENV_JWTConfigType
}

interface ENV_JWTConfigType{
    JWT_ISSUER:string;
    JWTKEY:string;
    JWTKEY_TTL:string;
    JWT_REFRESH_SECRET:string;
    JWT_REFRESH_TOKEN_TTL:string;
}