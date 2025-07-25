import pessoas from '../pessoas.routes.js';

describe('pessoas router', () => {
it('deve definir todas as rotas corretamente', () => {
    const routes = pessoas.stack
    .filter(layer => layer.route)
    .map(layer => ({
        path: layer.route.path,
        methods: Object.keys(layer.route.methods)
    }));

    expect(routes).toEqual(
    expect.arrayContaining([
        expect.objectContaining({ path: '/', methods: expect.arrayContaining(['get']) }),
        expect.objectContaining({ path: '/cadastrar', methods: expect.arrayContaining(['post']) }),
        expect.objectContaining({ path: '/deletar/:id', methods: expect.arrayContaining(['delete']) }),
        expect.objectContaining({ path: '/atualizar/:id', methods: expect.arrayContaining(['patch']) }),
    ])
    );
});
});