import { toast } from "react-toastify";

export function notificarSucesso(mensagem) {
    toast.success(mensagem);
}

export function notificarErro(mensagem) {
    toast.error(mensagem);
}