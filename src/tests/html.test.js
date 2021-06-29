import { render } from '@testing-library/react';
import HTMLhelper from "../helpers/htmlHelper";
test("HTML create", () => {
    const result = HTMLhelper.createHTML({
        title: "title",
        message: "message"
    });
    render(result, document.body);
    expect(document.body.querySelector("h3")).toHaveTextContent("title");
    expect(document.body.querySelector("p")).toHaveTextContent("message");
})

test("String From JSON", () => {
    const testJson = { "rest": "test", "fest": "best" };
    const testString = HTMLhelper.stringFromJSON(testJson);
    expect(testString).not.toBeNaN();
    expect(testString).not.toBeNull();
    expect(testString).toHaveLength(20)
})