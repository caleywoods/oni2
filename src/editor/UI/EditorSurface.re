/*
 * EditorSurface.re
 *
 * Component that handles rendering of the 'editor surface' -
 * the view of the buffer in the window.
 */

/* open Revery.Core; */
open Revery.UI;

open CamomileLibraryDefault.Camomile;

open Oni_Core;
open Oni_Core.TokenizedBufferView;

open Types;

/* Set up some styles */
let textHeaderStyle =
  Style.[fontFamily("FiraCode-Regular.ttf"), fontSize(14)];

/* Set up some styles */
let fontAwesomeStyle =
  Style.[fontFamily("FontAwesome5FreeRegular.otf"), fontSize(14)];

let fontAwesomeIcon = Zed_utf8.singleton(UChar.of_int(0xF556));

let _tokensToElement = (fontWidth: int, fontHeight: int, virtualLineNumber: int, tokens: list(Tokenizer.t)) => {
   
    let f = (token: Tokenizer.t) => {
        let style = Style.[
            position(`Absolute),
            top(fontHeight * virtualLineNumber),
            left(fontWidth * Position.toZeroBasedIndex(token.startPosition)),
            fontFamily("FiraCode-Regular.ttf"),
            fontSize(14),
        ];

        <Text style text={token.text} />
    };

    List.map(f, tokens);
};

let _viewLinesToElements = (fontWidth: int, fontHeight: int, bufferView: TokenizedBufferView.t) => {

  let f = (b: BufferViewLine.t) => {
    _tokensToElement(fontWidth, fontHeight, Position.toZeroBasedIndex(b.virtualLineNumber), b.tokens);
  };


  Array.map(f, bufferView.viewLines)
    |> Array.to_list
    |> List.flatten
};

let component = React.component("EditorSurface");

let make = (state: State.t) =>
  component((_slots: React.Hooks.empty) => {
    let theme = Theme.get();

    let bufferView =
      Buffer.ofLines([|
        "- Hello from line 1",
        "- Hello from line 2",
        "--- Hello from line 3",
      |])
      |> TokenizedBuffer.ofBuffer
      |> TokenizedBufferView.ofTokenizedBuffer;

    let textElements = _viewLinesToElements(state.editorFont.measuredWidth, state.editorFont.measuredHeight, bufferView);

    let style =
      Style.[
        backgroundColor(theme.background),
        color(theme.foreground),
        flexGrow(1),
      ];
    /* flexShrink(1), */

    <View style> ...textElements </View>;
  });

let createElement = (~state, ~children as _, ()) => React.element(make(state));
