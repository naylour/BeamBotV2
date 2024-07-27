import type { AppData, User as UserType } from '@repo/db/types';
import type { User } from '@repo/db/types';

declare global {
	namespace App {
		// interface Error {}
		interface Locals {
            user: User | null;
            isAuth: boolean;
        }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}

        interface User extends UserType {}
        interface ExchangesData {
            address: string;
            amount: number;
            exchanges: AppData.ExchangesData
        }

        interface Core {
            loader: {
                isLoad: boolean
            }
        }

        interface Exchanges {
            trx: {
                amount: number,
                gain: number
            },
            usdt: {
                amount: number,
                gain: number
            }
        }
	}

    type ClearFunc = () => any;

    interface WebApp {
        initData: string;
        initDataUnsafe: {
            query_id: string;
            user: {
                id: number;
                first_name: string;
                last_name: string;
                username: string;
                language_code: string;
                allows_write_to_pm: boolean;
            };
            auth_date: string;
            hash: string;
        },
        BackButton: {
            hide: ClearFunc;
            show: ClearFunc;
            onClick: (callback: ClearFunc) => {}
            offClick: (callback: ClearFunc) => {}
        };
        showAlert: (text: string) => any;
        openLink: (text: string) => any;
        openTelegramLink: (text: string) => any;
        showScanQrPopup: (params: {[key: string]: any}, callback: (data: any) => boolean) => any;
        expand: ClearFunc;
        ready: ClearFunc;
        showPopup: (obj: {
            message: string;
            buttons: {
                type: 'destructive' | 'default';
                id: string;
                text: string;
            }[];
            title: string;
        }, callback?: (buttonId: string) => any) => void;
    }

    interface TelegramType {
        Utils: {};
        WebView: {};
        WebApp: WebApp;
    }

    interface Window {
        Telegram: TelegramType;
    }
}

export {};