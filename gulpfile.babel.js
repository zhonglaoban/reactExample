/**
 * Created by zhongfan on 2017/1/18.
 */
import gulp from 'gulp';
import gulpUtil from 'gulp-util';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';
import del from 'del';
import exec from 'exec';

gulp.task('clean-all', function () {
    return del([webpackConfig.output])
});

gulp.task('watch', () => {
    return gulp.watch('src/**/*.*', {verbose: true}, ['webpack:build'])
});

gulp.task('webpack:build', (callback) => {
    // run webpack
    webpack(webpackConfig, (err) => {
        if (err)
            throw new gulpUtil.PluginError('webpack:build', err);
        callback();
    });
});

gulp.task('server', (callback) => {
    exec('node server.js', (err) => {
        if (err)
            throw new gulpUtil.PluginError('webpack:build', err);
        callback()
    })
});

gulp.task('default', ['watch', 'webpack:build', 'server']);

