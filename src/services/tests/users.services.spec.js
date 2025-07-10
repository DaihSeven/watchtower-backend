import * as usersService from '../user.service.js';

describe('users.service', () => {
it('deve exportar registrar', () => {
    expect(typeof usersService.registrarUsuario).toBe('function');
});

it('deve exportar login', () => {
    expect(typeof usersService.loginUsuario).toBe('function');
});


});