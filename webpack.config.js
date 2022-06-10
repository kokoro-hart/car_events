const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const globule = require("globule");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

// 本番環境のときはsoucemapを出力させない設定
const enabledSourceMap = process.env.NODE_ENV !== "production";

const app = {
  //エントリーポイント
  entry: './src/js/main.js',
  // 出力先（distの中のjsフォルダへbundle.jsを出力）
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "./js/bundle.js",
  },
  //仮想サーバーの設定
  devServer: {
    //ルートディレクトリの指定
    static: {
      directory: path.join(__dirname, "dist")
    },
    compress: true,
    // ブラウザを自動的に起動
    open: true,
    // ホットリロード
    hot: false,
    // ポート番号指定
    port: 3000,
    // 監視するフォルダ
    watchFiles: {
      paths: ["src/**/*"],
    },
    // bundle先ファイルを出力する
    devMiddleware: {
      writeToDisk: true,
    }
  },
  module: {
    rules: [
      {
        //babelの設定
        test: /\.(ts|js)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    // // 必要なポリフィルを出力させる
                    // useBuiltIns: 'usage',
                    // corejs: {
                    //   version: '3.22.5',
                    //   proposals: true
                    // }
                  }
                ],
                ['@babel/preset-typescript']
              ]
            }
          },
        ]
      },
      {
        //Sassの設定
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: enabledSourceMap,
              importLoaders: 2
            }
          },
          {
            loader: "postcss-loader",
            options: {
              // production モードでなければソースマップを有効に
              sourceMap: enabledSourceMap,
              postcssOptions: {
                // ベンダープレフィックスを自動付与
                plugins: [require("autoprefixer")({ grid: true })]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              // dart-sass を優先
              implementation: require("sass"),
              //  production モードでなければソースマップを有効に
              sourceMap: enabledSourceMap
            }
          },
        ]
      },
      {
        //画像の設定
        test: /\.(jpe?g|png|gif|svg|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name][ext]',
        },
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              webp: {
                quality: 75
              }
            }
          }
        ]
      },
      {
        // Pugの設定
        test: /\.pug$/,
        use: [
          {
            loader: 'html-loader'
          },
          {
            loader: 'pug-html-loader',
            options: {
              pretty: true
            }
          }
        ]
      }
    ]
  },
  resolve: {
    // import 文で .ts ファイルを解決
    extensions: [".ts", ".js"]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename:'./css/style.css',
    }),
  ],
  //source-mapを出力する
  // devtool: "source-map",

  // node_modules を監視（watch）対象から除外
  watchOptions: {
    ignored: /node_modules/ 
  }
}
//srcフォルダからpugを探す
const templates = globule.find("./src/pug/**/*.pug", {
  ignore: ["./src/pug/**/_*.pug"]
});

//すべてのpugファイルをhtmlに変換
templates.forEach((template) => {
  const fileName = template.replace("./src/pug/", "").replace(".pug", ".html");
  app.plugins.push(
    new HtmlWebpackPlugin({
      filename: `${fileName}`, // ファイル名を指定
      template: template, // どのフォルダから読み込むのか指定
      inject: 'body', // scriptタグの出力先
      minify: false, //本番環境でも圧縮するか
      favicon: './src/img/favicon.ico',
    }),
  );
});

module.exports = app;