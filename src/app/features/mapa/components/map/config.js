// In real applications, you should not transpile code in the browser. You can see how to create your own application with Angular and DevExtreme here:
// https://js.devexpress.com/Documentation/Guide/Angular_Components/Getting_Started/Create_a_DevExtreme_Application/
System.config({
    transpiler: 'ts',
    typescriptOptions: {
        module: "system",
        emitDecoratorMetadata: true,
        experimentalDecorators: true
    },
    meta: {
        'typescript': {
            "exports": "ts"
        },
    },
    paths: {
        'npm:': 'https://unpkg.com/'
    },
    map: {
        'ts': 'npm:plugin-typescript@8.0.0/lib/plugin.js',
        'typescript': 'npm:typescript@3.4.5/lib/typescript.js',
        '@angular': 'npm:@angular',
        'tslib': 'npm:tslib/tslib.js',
        'rxjs': 'npm:rxjs',
        'devextreme': 'npm:devextreme@19.2',
        'jszip': 'npm:jszip@3.1.3/dist/jszip.min.js',
        'quill': 'npm:quill@1.3.7/dist/quill.js',
        'devexpress-diagram': 'npm:devexpress-diagram@0.1.54',
        'devexpress-gantt': 'npm:devexpress-gantt@0.0.29',
        'devextreme-angular': 'npm:devextreme-angular@19.2'
    },
    packages: {
        'app': {
            main: './app.component.ts',
            defaultExtension: 'ts'
        },
        'devextreme': {
            defaultExtension: 'js'
        },
    },
    packageConfigPaths: [
        "npm:*/package.json",
        "npm:@angular/*/package.json",
        "npm:@angular/common/*/package.json",
        "npm:rxjs/operators/package.json",
        "npm:devextreme-angular@19.2/*/package.json",
        "npm:devextreme-angular@19.2/ui/*/package.json",
    ]
});