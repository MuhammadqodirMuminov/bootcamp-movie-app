import { ErrorMessage, FieldHookConfig, useField } from "formik";
import { TextFieldProps } from "./textfeild.props";

const TextFeild = (props: TextFieldProps & FieldHookConfig<string>) => {
	const [feild, meta] = useField(props);

	return (
		<div className="w-full inline-block">
			<label
				className={`inline-block w-full ${
					meta.touched && meta.error && "border-2 border-red-500"
				}`}>
				<input className="input" {...props} {...feild} />
			</label>
			<p className="text-red-500">
				<ErrorMessage name={`${feild.name}`} />
			</p>
		</div>
	);
};

export default TextFeild;
