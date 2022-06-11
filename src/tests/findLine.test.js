import { render } from '@testing-library/react';
import FindLine from "../users/findLine"
test("Is exist",()=>{
    render(<FindLine />,document.body)
    expect(document.body.querySelector("[data-testid='FindLine']")).toBeInTheDocument()
    expect(document.body.querySelector(".Separator")).toBeVisible()
    expect(document.querySelector("[data-testid='inner']")).toBeVisible()
})