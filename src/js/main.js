
/**
 *  エントリポイントファイル
 */

// jsモジュールの読み込み
import dummyModule from './modules/dummy'

// tsモジュールの読み込み
import dummyTsModule from './ts/dummy'

// scssを読み込み
import '../scss/style.scss'

dummyModule();
console.log(dummyTsModule(12, 9));